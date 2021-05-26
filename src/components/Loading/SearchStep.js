import { Component } from "react";

export default class SearchStep extends Component {
  componentDidMount() {
    return this.props.history.push(`/search/${this.props.match.params.searchitem}`);
  }
  render() {
    return <div></div>;
  }
}
