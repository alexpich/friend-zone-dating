import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Components
import Nav from "./components/Nav";

// Pages
import Home from "./pages/home";
import LoveZone from "./pages/lovezone";
import Matches from "./pages/matches";
import Messages from "./pages/messages";
import Profile from "./pages/profile";
import Signin from "./pages/signin";
import Signup from "./pages/signup";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Nav />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/lovezone" component={LoveZone} />
              <Route exact path="/matches" component={Matches} />
              <Route exact path="/messages" component={Messages} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/signin" component={Signin} />
              <Route exact path="/signup" component={Signup} />
            </Switch>
          </div>
        </Router>
      </header>
    </div>
  );
}

export default App;
