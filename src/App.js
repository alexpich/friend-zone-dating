import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//components
import Nav from "./components/Nav";

//pages
import Home from "./pages/home";
import Signin from "./pages/signin";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Nav />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/signin" component={Signin} />
            </Switch>
          </div>
        </Router>
      </header>
    </div>
  );
}

export default App;
