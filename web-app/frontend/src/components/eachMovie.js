import './eachMovie.css';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./modal.css"

export const EachMovie = (props) => {
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

    let poster = "https://image.tmdb.org/t/p/original" + props.moviePoster;
    let backdropImage = "https://image.tmdb.org/t/p/original" + props.bgImage;
    return (
        <div className='movieStack' onClick={(e) => props.onClickFunc(props.index)}>
            <div className="eachMovie">
                <img alt="moviePoster" src={poster} className="moviePoster"/>
                <h1 className="movieTitle"> {props.movieTitle} </h1>
                <h1 className="movieRating"> {props.movieRating} </h1>
                <h1 className="movieLanguage"> {props.movieLanguage} </h1>
            </div>
            <div className='movieDescription' style={{backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.5) ), url(${backdropImage})`}}>
                <h3> Title </h3>
                <p> {props.movieTitle} </p>
                <h3> Description </h3>
                <p> {props.movieDescription} </p>
                <div className='rateAndLang'>
                    <h4> Rating </h4>
                    <h4> Language </h4>
                    <h4> {props.type === "tv" ? "First Air Date" : "Release Date"} </h4>
                </div>
                <div className='rateAndLang'>
                    <p> {props.movieRating} </p>
                    <p style={{textTransform: 'uppercase'}}> {props.movieLanguage} </p>
                    <p> {props.movieRD} </p>
                </div>
            </div>
        </div>
    );
}

