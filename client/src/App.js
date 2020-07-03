import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Components
import Nav from "./components/Nav";

// Pages
import Home from "./pages/home";
import Friends from "./pages/friends";
import Messages from "./pages/messages";
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
              <Route exact path="/friends" component={Friends} />
              <Route exact path="/messages" component={Messages} />
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
