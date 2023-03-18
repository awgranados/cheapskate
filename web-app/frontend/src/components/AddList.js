import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

function AddList() {
  const [listInput, setListInput] = useState("");
  const [items, setItems] = useState([]);
  const { user } = useAuth0();
  const userID = user.sub.split("|")[1];

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const data = await fetch(`${process.env.REACT_APP_BASE_URL}/lists/${encodeURIComponent(userID)}`);
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
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/addList/${encodeURIComponent(userID)}`, {
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
  );
}

export default AddList;
