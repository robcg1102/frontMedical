import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import GAME_SERVICE from "../services/videogamesServices";
import swal from "sweetalert";

export default function FormGame(props) {
  let history = useHistory();
  const id = props.match.params.id
  const [developers, setDevelopers] = useState([]);
  const [consoles, setConsoles] = useState([]);

  const [nameGame, setnameGame] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [imagegame, setImage] = useState(null);
  const [yearGame, setYearGame] = useState(1950);
  const [developer, setDeveloper] = useState("");
  const [consoleGame, setConsole] = useState("");

  useEffect(() => {
    if (id) {
      GAME_SERVICE.detailGame(id).then((game) => {
        setnameGame(game.data.data.name);
        setYearGame(game.data.data.year);
        setImage(game.data.data.image);
        setDescription(game.data.data.description);
        setIsActive(game.data.data.is_active);
        setConsole(game.data.data.console[0][0].name);
        setDeveloper(game.data.data.developer.name);
      });
    }

    GAME_SERVICE.alldevelopers().then((data) => {
      setDevelopers(data.data.data);
    });

    GAME_SERVICE.allconsoles().then((data) => {
      setConsoles(data.data.data);
    });
  }, [id]);

  const sendData = (e) => {
    e.preventDefault();

    if (description.length > 300) {
      swal(
        "Alerta!",
        "La descripción no puede ser mayor a 300 caracteres",
        "warning"
      );
    }

    if (
      yearGame % 1 !== 0 ||
      isNaN(yearGame) ||
      yearGame === 0 ||
      yearGame < 1950 ||
      yearGame > 2021
    ) {
      return swal(
        "Alerta!",
        "El año tiene que ser un número entero entre 1950 y 2021",
        "warning"
      );
    }
    if (
      !yearGame ||
      !nameGame ||
      !description ||
      !developer ||
      !consoleGame ||
      !imagegame
    ) {
      return swal("Alerta!", "Tienes que llenar todos los campos", "warning");
    }

    const myFormData = new FormData();
    myFormData.append("name", nameGame);
    myFormData.append("description", description);
    myFormData.append("year", yearGame);
    if (!props.match.params.id) {
      myFormData.append("image", imagegame);
    }
    myFormData.append("is_active", isActive);
    myFormData.append("developer", developer);
    myFormData.append("console", consoleGame);

    if (props.match.params.id) {
      GAME_SERVICE.updateGame(props.match.params.id, {
        name: nameGame,
        description: description,
        year: yearGame,
        is_active: isActive,
        developer: developer,
        console: consoleGame,
      })
        .then((result) => {
          return history.push(`/gamedetail/${props.match.params.id}`);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    GAME_SERVICE.createGame(myFormData).then((result) => {
      history.push("/");
    });
  };

  const handleFile = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="mt-3 mb-5 container">
      <form>
        <fieldset>
          {!props.match.params.id ? (
            <legend>Crea un juego</legend>
          ) : (
            <legend>Edita el juego</legend>
          )}

          <div className="form-group">
            <label htmlFor="gameName">Nombre del juego</label>
            <input
              type="text"
              className="form-control"
              id="gameName"
              aria-describedby="emailHelp"
              placeholder="Nombre del juego"
              value={nameGame}
              onChange={(e) => setnameGame(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleTextarea">Descripción</label>
            <textarea
              className="form-control"
              id="exampleTextarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="exampleSelect1">Consola: </label>

            <select
              className="form-select"
              id="exampleSelect1"
              name="consSelect"
              onChange={(e) => setConsole(e.target.value)}
              required            
            >
              <option>Consola</option>
              {consoles.map((console) => {
                return (
                  <option value={console._id} key={console._id}>
                    {console.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="exampleSelect1">Desarrollador: </label>

            <select
              className="form-select"
              id="exampleSelect1"
              name="devSelect"
              onChange={(e) => setDeveloper(e.target.value)}
              required
            >
              <option>Desarrollador</option>
              {developers.map((dev) => {
                return (
                  <option value={dev._id} key={dev._id}>
                    {dev.name}
                  </option>
                );
              })}
            </select>
          </div>

          {!props.match.params.id && (
            <div className="form-group">
              <label htmlFor="formFile" className="form-label">
                Imagen del juego
              </label>
              <input
                className="form-control"
                type="file"
                id="formFile"
                onChange={(e) => handleFile(e)}
              />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="year">Año</label>
            <input
              type="number"
              className="form-control"
              id="year"
              aria-describedby="emailHelp"
              value={yearGame}
              onChange={(e) => setYearGame(Number(e.target.value))}
              min="1950"
              max="2021"
            />
          </div>
          <fieldset className="form-group">
            <legend>¿Se encuentra activo?</legend>
            <div className="form-check">
              <label className="form-check-label">
                <input
                  type="radio"
                  className="form-check-input"
                  name="optionsRadios"
                  id="optionsRadios1"
                  onChange={(e) => {
                    setIsActive(true);
                    console.log(isActive);
                  }}
                />
                Activo
              </label>
            </div>
            <div className="form-check">
              <label className="form-check-label">
                <input
                  type="radio"
                  className="form-check-input"
                  name="optionsRadios"
                  id="optionsRadios2"
                  onChange={(e) => {
                    setIsActive(false);
                    console.log(isActive);
                  }}
                />
                No activo
              </label>
            </div>
          </fieldset>
          {props.match.params.id && (
            <button
              className="btn btn-warning mr-2"
              onClick={(e) => {
                history.push(`/gamedetail/${props.match.params.id}`);
              }}
            >
              Cancelar
            </button>
          )}
          <button
            type="submit"
            className="btn btn-primary"
            onClick={(e) => sendData(e)}
          >
            Submit
          </button>
        </fieldset>
      </form>
    </div>
  );
}
