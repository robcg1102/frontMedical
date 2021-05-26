import { Link, useHistory } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  let history = useHistory();

  let [searchitem, setSearchGame] = useState("");

  const searchItemF = (e) => {
    e.preventDefault();
    if (searchitem === "") {
      return;
    }

    history.push(`/searchstep/${searchitem}`);
    setSearchGame("")
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Videojuegos
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor02"
          aria-controls="navbarColor02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarColor02">
          <ul className="navbar-nav me-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/charge">
                Crea un juego
              </Link>
            </li>
          </ul>
          <form className="d-flex">
            <input
              className="form-control me-sm-2"
              type="text"
              placeholder="Buscar un juego"
              value={searchitem}
              onChange={(e) => setSearchGame(e.target.value)}
            />
            <button
              className="btn btn-secondary my-2 my-sm-0"
              onClick={(e) => searchItemF(e)}
            >
              Buscar
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}
