import React, { useState, useEffect } from 'react';
import { ScrollRestoration, useParams } from 'react-router-dom';
import "./modal.css"

function List() {
  const { id } = useParams();
  const [games, setGames] = useState([]);
  const [gameTitles, setGameTitles] = useState([]);
  const [results, setResults] = useState([]);
  const [newGame, setNewGame] = useState("");
  const [showOverlay, setShowOverlay] = useState(false);
  const [gameScores, setGameScores] = useState({});
  
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/list/${encodeURIComponent(id)}`);
    const data = await response.json();
    console.log(data)
    setGames(data);
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

    console.log(url, " passed from frontend")
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/scrape/${encodeURIComponent(url)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(response);
    console.log("test1");
    const responseJson = await response.json();
    console.log(responseJson);
    console.log("test2");
    setResults(responseJson)
    console.log("test3");
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

  const handleScoreUpdate = (tuple) => {
    const newScore = gameScores[tuple.game._id];
    const gameId = tuple.game._id;
    console.log(newScore);
    console.log(tuple.game.score);
    fetch(`${process.env.REACT_APP_BASE_URL}/updateScore/${gameId}`, {
      method: "PUT",
      body: JSON.stringify({ score: newScore }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update score.");
        }
        return response.json();
      })
      .then((data) => {
        setGameScores(prevState => ({
          ...prevState,
          [gameId]: newScore
        }));
        tuple.game.score = newScore;
      })
      .catch((error) => { 
        console.error(error);
      });
  }
  
  
  
  
  return (
    <div >
      <form id="search-form" onSubmit={handleSubmit}>
      <div>
        <h1>&nbsp;</h1>
        <h1>&nbsp;</h1>
      </div>
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
      <div>
          <h6>&nbsp;</h6>
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
                          <th>Disc.</th>
                          <th>Add</th>
                      </tr>
                  </thead>
                  <tbody>
                      {results.map((item) => (
                          <tr key={item.id}>
                          <td>
                              <img src={item.img} alt="Product" width="150" height="100" />
                          </td>
                          <td>{item.name}</td>
                          <td>{item.price == "Free" ? "Free" : item.price == "" ? "N/A" : "$"+item.price.split("$")[1]}</td>
                          <td>{item.price.split("$")[2] ? "$"+item.price.split("$")[2]: " "}</td>
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
      <table className="modal-table" >
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
                  {tuple.game.img ? (
                    <img src={tuple.game.img} alt={tuple.game.title} style={{ width: "240px", height: "90px" }} />
                  ) : (
                    <img src={'https://previews.123rf.com/images/srijianti/srijianti1705/srijianti170519196/78898846-game-text-for-title-or-headline-in-3d-fancy-fun-and-futuristic-style.jpg'} alt={tuple.game.title} style={{ width: "150px", height: "150px" }} />

                  )}
                </td>
                <td>{`${tuple.game.title}`}</td>
                <td>
            <select value={gameScores[tuple.game._id] || ''} onChange={(e) => setGameScores((prevScores) => ({ ...prevScores, [tuple.game._id]: e.target.value }))}>
            <option key={tuple.game.score} value={tuple.game.score}>
              {tuple.game.score}
            </option>                  
                {[...Array(10).keys()].map((i) => (
                    <option key={i + 1} value={i + 1}>
                        {i + 1}
                    </option>
                ))}
            </select>
        </td>
        <td>
            <button onClick={() => handleScoreUpdate(tuple)}>Save</button>
        </td>
        </tr>
        ))}
      </tbody>
      </table>
    </div>
  );
}
export default List;