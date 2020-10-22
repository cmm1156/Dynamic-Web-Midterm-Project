import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Styles
import './App.css';

// Containers
import Home from "./containers/Home";

function App() {
  return (
    <div className="App">
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
