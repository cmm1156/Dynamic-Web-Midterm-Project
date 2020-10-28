import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Styles
import "./App.css";

// Containers
import Home from "./containers/Home";

function App() {
  return (
    <div className="App">
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
      </style>
      <Router>
        <Switch>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
