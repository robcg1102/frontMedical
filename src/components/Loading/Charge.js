import { Component } from "react";

export default class Charge extends Component {
  componentDidMount() {
    if (this.props.match.params.id) {
      return this.props.history.push(`/editgame/${this.props.match.params.id}`);
    }
    return this.props.history.push("/creategame")
  }
  render() {
    return <div></div>;
  }
}
