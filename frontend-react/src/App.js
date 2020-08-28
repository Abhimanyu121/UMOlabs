import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import {
  Route,
  Switch,
  BrowserRouter as Router,
  HashRouter,
} from "react-router-dom";
import Navbar from "./Navbar";
import Proposal from "./Proposal";
import Categories from "./Categories";
import NewPage from "./NewPage";
function App() {
  return (
    <div className="App">
      <Navbar />
      <HashRouter>
        <Switch>
          <Route exact path="/" component={Categories} />
          <Route exact path="/proposal" component={Proposal} />
          <Route exact path="/newpage" component={NewPage} />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
