import React, { useState, useMemo } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { UserContext } from "./context/UserContext";

// Components
import Nav from "./components/Nav";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Home from "./pages/home";
import LoveZone from "./pages/lovezone";
import Matches from "./pages/matches";
import Messages from "./pages/messages";
import Profile from "./pages/profile";
import Signin from "./pages/signin";
import Signup from "./pages/signup";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const currentUserValue = useMemo(() => ({ currentUser, setCurrentUser }), [
    currentUser,
    setCurrentUser,
  ]);

  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <UserContext.Provider value={currentUserValue}>
            <Nav />
            <div>
              <Switch>
                <Route exact path="/" component={Home} />
                <ProtectedRoute exact path="/lovezone" component={LoveZone} />
                <ProtectedRoute exact path="/matches" component={Matches} />
                <ProtectedRoute exact path="/messages" component={Messages} />
                <ProtectedRoute exact path="/profile" component={Profile} />
                <Route exact path="/signin" component={Signin} />
                <Route exact path="/signup" component={Signup} />
              </Switch>
            </div>
          </UserContext.Provider>
        </Router>
      </header>
    </div>
  );
}

export default App;
