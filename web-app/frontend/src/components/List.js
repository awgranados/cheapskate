import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function List() {
  const { id } = useParams();
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/list/${encodeURIComponent(id)}`);
    const data = await response.json();
    console.log(data)
    setGames(data);
  };

  return (
    <div>
        <form id = "searchForm">
            <input id = "name" type="text" placeholder="Search for your game here."></input>
            <button type="submit">
                <i class="fa-sharp fa-solid fa-magnifying-glass"></i>
            </button>
        </form>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Game</th>
            </tr>
          </thead>
          <tbody>
          {games.map((game) => (
              <tr key={game._id}>
                  <td>{`${game.title}`}</td>
                  <td>{game.desc}</td>
              </tr>
          ))}
        </tbody>
        </table>
    </div>
  );
}

export default List;