import { Component } from "react";
import GAME_SERVICE from "../services/videogamesServices";
import CardGame from "./CardGame";
import LoadingSpin from "./Loading/LoadingSpin";

export default class SearchGame extends Component {
  state = {
    searchResult: [],
    loading: true,
  };

  componentDidMount() {
    GAME_SERVICE.allgames().then((data) => {
      const searchGame = this.props.match.params.game;
      const myRegex = new RegExp(searchGame, "i");

      const searchResult = data.data.data.filter(
        (game) => myRegex.test(game.name) || myRegex.test(game.year)
      );
      this.setState({ loading: false });

      this.setState({ searchResult: searchResult });
    });
  }

  render() {
    return (
      <div>
        <div className="container mt-3 text-center">
          <h3>Resultados: {this.state.searchResult.length}</h3>

          {this.state.searchResult.length > 0 && (
            <div className="cardGame mt-3 d-flex flex-wrap justify-content-around">
              {this.state.searchResult.map((videogame) => {
                return (
                  <div key={videogame._id} className="myCard">
                    <CardGame game={videogame} />
                  </div>
                );
              })}
            </div>
          )}
          {this.state.loading === false &&
            this.state.searchResult.length === 0 && (
              <h4>
                No hay resultados con tu búsqueda:{" "}
                {this.props.match.params.game}
              </h4>
            )}
          {this.state.loading && <LoadingSpin />}
        </div>
      </div>
    );
  }
}
