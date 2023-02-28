import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom';

function Lists() {
  const [listInput, setListInput] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const data = await fetch(`${process.env.REACT_APP_BASE_URL}/lists`);
    const items = await data.json();
    console.log(items)
    setItems(items);
  };

  const handleListInputChange = (event) => {
    setListInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { listInput };
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/addList`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseJson = await response.json();
    setItems([...items, responseJson]);
    console.log(responseJson);
  };

  return (
    <section>
      <div className="container-fluid">
        <h1 className="mt-5">Lists</h1>
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
        {items.map((item) => (
           <Link to={`/list/${item._id}`} key={item._id}>
                <div className="row padding" key={item._id}>
                    <div className="alert alert-info rounded-pill" role="alert">
                    <i className="fa fa-user mr-2"></i>{" "}
                    <i>
                        {item.user.fullname} ({item.user.username}): {item.list}
                    </i>
                    </div>
                </div>
            </Link> 
        ))}
      </div>
      {/* <div style={{ overflow: 'scroll', height: '400px' }}>
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
        {items.map(item => (
        <div key={item._id}>
          <h3>{item.user.fullname}</h3>
          <p>{item.list}</p>
          <hr />
        </div>
        ))}
      </div> */}
    </section>
  );
}

export default Lists;
