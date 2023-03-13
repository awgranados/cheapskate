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

    // Fetch the games from MongoDB with matching `selectedList` value
    const gamesResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/games`);
    const gamesData = await gamesResponse.json();
    const filteredGames = gamesData.filter(game => game.selectedList === id);

    // Map over the filtered games to get only the title field
    const gameTitles = filteredGames.map(game => game.title);
    console.log("game", gameTitles)
    setGameTitles(gameTitles);
    
    // Update the `games` state variable with the `filteredGames` array
    setGames(filteredGames);
  };
  
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

    console.log(url)
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

  return (
    <div>
        <form id = "searchForm" onSubmit = {handleSubmit}>
            <input 
            id = "name" 
            type="text" 
            placeholder="Search for your game here."
            value = {newGame}
            onChange = {handleNewGameChange}>
            </input>
            <button type="submit">
                <i class="fa-sharp fa-solid fa-magnifying-glass"></i>
            </button>
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
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            </div>
        </div>
        )}
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
