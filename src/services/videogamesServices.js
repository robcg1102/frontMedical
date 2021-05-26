import axios from "axios";

const baseURL = "https://medicalback.herokuapp.com/api";

const service = axios.create({
  baseURL,
});

const GAME_SERVICE = {
  allgames: () => {
    return service.get("/videogames");
  },
  createGame: (data) => {
    return service.post("/videogames/add", data);
  },

  detailGame: (idGame) => {
    return service.get(`/videogames/${idGame}`);
  },

  updateGame: (gameId, data) => {
    return service.put(`/videogames/update/${gameId}`, data);
  },

  deleteGame: (idGame) => {
    return service.delete(`/videogames/delete/${idGame}`);
  },

  allconsoles: () => {
    return service.get("/consoles");
  },
  alldevelopers: () => {
    return service.get("/developers");
  },
};

export default GAME_SERVICE;
