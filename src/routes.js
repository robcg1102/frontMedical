import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import DetailGame from "./components/DetailGame";
import FormGame from "./components/FormGame";
import Home from "./components/Home";
import Charge from "./components/Loading/Charge";
import SearchGame from "./components/SearchGame";
import Navbar from "./components/Navbar";
import SearchStep from "./components/Loading/SearchStep";

export default function Routes() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/search/:game" component={SearchGame} />
          <Route exact path="/gamedetail/:id" component={DetailGame} />
          <Route exact path="/charge/:id?" component={Charge} />
          <Route exact path="/searchstep/:searchitem" component={SearchStep} />
          <Route exact path="/creategame" component={FormGame} />
          <Route exact path="/editgame/:id" component={FormGame} />
          <Route path="*" />
        </Switch>
      </div>
    </Router>
  );
}
