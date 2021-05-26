import { useState, useEffect } from "react";
import MY_FUNCTIONS from "../functions/myFunctions";
import GAME_SERVICE from "../services/videogamesServices";
import CardGame from "./CardGame";

import LoadingSpin from "./Loading/LoadingSpin";

export default function Home() {
  
  const [videogames, setVideogames] = useState([]);
  const [order, setOrder] = useState("raw");

  useEffect(() => {
    GAME_SERVICE.allgames().then((data) => {
      setVideogames(data.data.data);
    });
  }, []);

  useEffect(() => {
    if (order !== "name") {
      setVideogames(videogames.sort(MY_FUNCTIONS.compareName));
    } else if (order !== "year") {
      setVideogames(videogames.sort(MY_FUNCTIONS.compareYear));
    }
  }, [order, videogames]);
  
  return (
    <div>
      <div className="App">
        <div className="container mt-3 text-center">
          <h3>Todos los juegos</h3>
          <div className=" form-check-inline mt-3">
            <button
              className="btn btn-primary mr-2"
              onClick={() => setOrder("name")}
            >
              Ordenar por nombre
            </button>
            <button
              className="btn btn-primary"
              onClick={() => setOrder("year")}
            >
              Ordenar por año
            </button>
          </div>

          {videogames.length > 0 && (
            <div className="cardGame mt-3 d-flex flex-wrap justify-content-around">
              {videogames.map((videogame) => {
                return (
                  <div key={videogame._id} className="myCard">
                    <CardGame game={videogame} />
                  </div>
                );
              })}
            </div>
          )}
          {videogames.length === 0 && <LoadingSpin />}
        </div>
      </div>
    </div>
  );
}
