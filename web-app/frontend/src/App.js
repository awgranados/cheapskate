import './App.css';
import Nav from './components/Nav';
import Home from './components/Home';
import FormTab from './components/FormTab';
import ListTable from './components/ListTable'; // import the new component
import Loading from './components/Loading';
import List from './components/List';
import Header from './components/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const {isLoading, error } = useAuth0();
  if (error) {
    return <div> Yikes {error.message}</div>
  }
  if (isLoading) {
    return <Loading/>;
  }
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/form" element={<FormTab />} />
            <Route path="/listtable" element={<ListTable />} /> // add the new route
            <Route path="/list/:id" element={<List />} />
            <Route path="/header/:id" element={<Header />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;

