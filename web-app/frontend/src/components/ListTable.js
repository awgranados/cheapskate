import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./ListTable.css";
import { Link } from "react-router-dom";
import AddList from "./AddList";

function ListTable() {
  const [lists, setLists] = useState([]);
  const { user, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      fetchLists();
    }
  }, [isAuthenticated]);

  const fetchLists = async () => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/lists`);
    const data = await response.json();
    console.log(data);
    setLists(data);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return (
      <section>
        <div className="container-fluid">
          <h1 className="mt-5">My Lists</h1>
          <AddList />
          <div className="card-container">
            {lists.map((list) => (
              <div className="card" key={list._id}>
                <Link to={`/list/${list._id}`} key={list._id}>
                  <h2>{list.list}</h2>
                  <p>{`${list.user.fullname} (${list.user.username})`}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
    
  }

  return (
    <div>
      Log in. Now.
    </div>
  );
}

export default ListTable;
