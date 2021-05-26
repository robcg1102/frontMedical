import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";

import GAME_SERVICE from "../services/videogamesServices";
import LoadingSpin from "./Loading/LoadingSpin";

export default function DetailGame(props) {

  let history = useHistory();

  const idGame = props.match.params.id;
  const [loading, setLoading] = useState(true);
  const [idGamedetail, setIdgame] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [year, setYear] = useState(0);
  const [image, setImage] = useState("");
  const [is_active, setActive] = useState(null);
  const [developer, setDeveloper] = useState("");
  const [consoleGame, setConsolegame] = useState("");

  useEffect(() => {
    GAME_SERVICE.detailGame(idGame).then((game) => {
      setLoading(false);
      setName(game.data.data.name);
      setIdgame(game.data.data._id)
      setDeveloper(game.data.data.developer.name);
      setYear(game.data.data.year);
      setImage(game.data.data.image);
      setDescription(game.data.data.description);
      setConsolegame(game.data.data.console[0][0].name);
      setActive(game.data.data.is_active);
    });
  }, [idGame]);

  const deleteGame = (e) =>{
    e.preventDefault();
    swal({
      title: "¿Quieres eliminar el juego?",
      text: "Una vez eliminado no podrás recuperarlo",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        GAME_SERVICE.deleteGame(idGame).then(result=>{
          swal("¡Tu archivo ha sido eliminado con éxito!", {
            icon: "success",
          });
          history.push("/");
        })
      } else {
        swal("No se eliminó el juego.");
      }
    });
  }
  return (
    <div className="container mt-3 text-center">
      <div>
        {!loading && (
          <div className="card mb-3 mb-4">
            <h3 className="card-header">{name}</h3>
            <div className="card-body">
              <h5 className="card-title">{developer}</h5>
              <h6 className="card-subtitle text-muted">{consoleGame}</h6>
              <h6 className="card-subtitle text-muted mt-2">{year}</h6>
              {is_active ? (
                <span className="badge bg-success" style={{color: "white"}}>Activo</span>
              ) : (
                <span className="badge bg-warning" style={{color: "white"}}>No está activo</span>
              )}
            </div>
            <div className="card-body">{description}</div>
            <div className="p-5 text-center" style={{ width: "100%" }}>
              <img src={image} alt="" width="70%" height="auto" />
            </div>

            <div className="card-body text-center">
              <button className="btn btn-warning m-2" onClick={()=> history.push(`/charge/${idGamedetail}`)}>Editar</button>
              <button className="btn btn-danger m-2" onClick={e=>deleteGame(e)} >Eliminar</button>
            </div>
          </div>
        )}
        {loading && <LoadingSpin />}
      </div>
    </div>
  );
}
