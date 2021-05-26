import { Link } from "react-router-dom";

import noPhoto from "../assets/noPhoto.jpeg";

export default function CardGame(props) {
  const game = props.game;
  return (
    <div>
      <Link to={`/gamedetail/${game._id}`}>
        <div className="card mb-3 text-center">
          <h5 className="card-header">{game.name}</h5>
          <div className="card-body">
            <h6 className="card-title">{game.developer.name}</h6>
            <h6 className="card-subtitle text-muted">{game.year}</h6>
          </div>
          <div className="text-center">
            {game.image ? (
              <img src={game.image} alt="" width="150px" height="auto" />
            ) : (
              <img src={noPhoto} alt="" width="150px" height="auto" />
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
