import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./modal.css"

function List() {
  const { id } = useParams();
  const [games, setGames] = useState([]);
  const [gameTitles, setGameTitles] = useState([]);
  const [results, setResults] = useState([]);
  const [newGame, setNewGame] = useState("");
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/list/${encodeURIComponent(id)}`);
    const data = await response.json();
    console.log(data)
    setGames(data);
  };

  // const fetchItems = async () => {
  //   const response = await fetch(`${process.env.REACT_APP_BASE_URL}/list/${encodeURIComponent(id)}`);
  //   const data = await response.json();

  //   // Fetch the games from MongoDB with matching `selectedList` value
  //   const gamesResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/games`);
  //   const gamesData = await gamesResponse.json();
  //   const filteredGames = gamesData.filter(game => game.selectedList === id);

  //   // Map over the filtered games to get only the title field
  //   const gameTitles = filteredGames.map(game => game.title);
  //   console.log("game", gameTitles)
  //   setGameTitles(gameTitles);
    
  //   // Update the `games` state variable with the `filteredGames` array
  //   setGames(filteredGames);
  // };
  
  const handleNewGameChange = (event) => {
    setNewGame(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let param = "";
    let words = newGame.split(" ");
    for (let i = 0; i < words.length; i++){
        param = param.concat("", words[i]);
        if (i != words.length-1){
            param = param.concat("+");
        } 
    }

    const site = "https://store.steampowered.com/search/?term=";
    const url = site.concat("", param);

    console.log(url, " passed from frontend")
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/scrape/${encodeURIComponent(url)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const responseJson = await response.json();
    setResults(responseJson)
    setShowOverlay(true);
    console.log(responseJson);
  };

  console.log('showOverlay:', showOverlay);

  const handleAddGame = (game) => {
    fetch(`${process.env.REACT_APP_BASE_URL}/addGame/${id}`, {
      method: "POST",
      body: JSON.stringify(game),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add game.");
        }
        return response.json();
      })
      .then((data) => {
        setGames([...games, data]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div >
        <form id="search-form" onSubmit={handleSubmit}>
  <div className="search-box">
    <input
      id="name"
      type="text"
      placeholder="Search for your game"
      value={newGame}
      onChange={handleNewGameChange}
    />
    <button type="submit" id="search-button">
      <i className="fa fa-search" aria-hidden="true"></i>
    </button>
  </div>
</form>
        {showOverlay && (
        <div className="overlay">
            <div className="overlay-content">
                <button onClick={() => setShowOverlay(false)}>Close</button>
                <div className="modal-table">
                <table>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((item) => (
                            <tr key={item.id}>
                            <td>
                                <img src={item.img} alt="Product" width="150" height="100" />
                            </td>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>
                              <button onClick={() => handleAddGame(item)}>Add</button>
                            </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            </div>
        </div>
        )}
        <table className="table" >
          <thead>
            <tr>
              <th scope="col">Image</th>
              <th scope="col">Game</th>
              <th scope="col">Review</th>
            </tr>
          </thead>
          <tbody>
          {games.map((tuple) => (
              <tr key={tuple.game._id}>
                  <td>
                    {tuple.game.img && (
                      <img src={tuple.game.img} alt={tuple.game.title} style={{ width: "150px", height: "150px" }} />
                    )}
                  </td>
                  <td>{`${tuple.game.title}`}</td>
                  <td>{`${tuple.review}`}</td>
              </tr>
          ))}
        </tbody>
        </table>
    </div>
  );
}
export default List;
