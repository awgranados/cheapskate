// import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav';
import Home from './components/Home';
import Lists from './components/Lists';
import FormTab from './components/FormTab';
import List from './components/List';
import Loading from './components/Loading';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {useAuth0} from "@auth0/auth0-react";

function App() {
  const {isLoading, error } = useAuth0();
  if (error){
    return <div> Yikes {error.message}</div>
  }
  if (isLoading){
    return <Loading/>;
  }
  return (
    <Router>
    <div className="App">
      <header className="App-header">
        <Nav />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/lists" element={<Lists />} />
            <Route path="/form" element={<FormTab />} />
            <Route path="/list/:id" element={<List />} />
        </Routes>
      </header>
    </div>
    </Router>
  );
}

export default App;
