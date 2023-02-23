import React, { useEffect, useState } from "react";
import FormData from "form-data";

function Lists() {
  const [listInput, setListInput] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const data = await fetch("/lists");
    const items = await data.json();
    setItems(items);
  };

  const handleListInputChange = (event) => {
    setListInput(event.target.value);
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const response = await fetch("/addList", {
      method: "POST",
      body: formData,
    });
    try {
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        fetchItems();
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.log(error);
      alert("Error adding list");
    }
    setListInput("");
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
          <div className="row padding" key={item._id}>
            <div className="alert alert-info rounded-pill" role="alert">
              <i className="fa fa-user mr-2"></i>{" "}
              <i>
                {item.user.fullname} ({item.user.username}): {item.list}
              </i>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Lists;
