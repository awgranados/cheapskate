import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./ListTable.css";
import { Link } from "react-router-dom";

function ListTable() {
  const [listInput, setListInput] = useState("");
  const [lists, setLists] = useState([]);
  const { user, isAuthenticated, isLoading } = useAuth0();
  const userID = user.sub.split("|")[1];

  useEffect(() => {
    if (isAuthenticated) {
      fetchLists();
    }
  }, [isAuthenticated]);

  const fetchLists = async () => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/lists/${encodeURIComponent(userID)}`);
    const data = await response.json();
    console.log(data);
    setLists(data);
  };

  const handleDelete = async (listId) => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/delete/${listId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      fetchLists(); // Reload the list of lists
    } else {
      console.error("Failed to delete list");
    }
  };
  
  const handleListInputChange = (event) => {
    setListInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { listInput };
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/addList/${encodeURIComponent(userID)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseJson = await response.json();
    setLists([...lists, responseJson]);
    console.log(responseJson);
  };

  if (isAuthenticated) {
    return (
      <section>
        <div className="container-fluid">
          <h1 className="mt-5">My Lists</h1>
          <section>
            <div className="container-fluid">
              <h1 className="mt-5"></h1>
              <form onSubmit={handleSubmit}>
                <div className="input-group justify-content-center">
                  <div className="input-group-prepend">
                    <input
                      type="text"
                      name="listInput"
                      className="form-control"
                      value={listInput}
                      onChange={handleListInputChange}
                    />
                    <input
                      type="submit"
                      value="Add"
                      className="btn btn-primary mb-2"
                    />
                  </div>
                </div>
              </form>
            </div>
          </section>
          <div className="card-container">
            {lists.map((list) => (
              <div className="card" key={list._id}>
                <Link to={`/list/${list._id}`} key={list._id}>
                  <h2>{list.list}</h2>
                  <p>{`${user.name.split("@")[0]}`}</p>
                </Link>
                <button className="delete-button" onClick={() => handleDelete(list._id)}>
                  <span className="delete-button-text">x</span>
                </button>
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
