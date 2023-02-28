// import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import axios from 'axios';

function List() {
  const { id } = useParams();
//   const [games, setGames] = useState({});

//   useEffect(() => {
//     axios.get(`/api/list/${id}`).then(response => {
//       setProduct(response.data);
//     });
//   }, [id]);

  return (
    // <div>
    //     {games.map(game => (
    //         <div>
    //             <h2>{game.name}</h2>
    //             <p>{game.description}</p>
    //         </div>
    //     ))}
    // </div>
    <div>
        <h2>{id}</h2>
    </div>
  );
}

export default List;