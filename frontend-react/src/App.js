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
import Categories from "./Categories";
import NewJob from "./NewJob";
import Job from "./Job";
function App() {
  return (
    <div className="App">
      <Navbar />
      <HashRouter>
        <Switch>
          <Route exact path="/" component={Categories} />
          <Route exact path="/job/:jobid" component={Job} />
          <Route exact path="/new-job" component={NewJob} />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
