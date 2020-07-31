import React, { useState, useMemo } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import { UserContext } from "./context/UserContext";

// Components
import Nav from "./components/Nav";
import ProtectedRoute from "./components/ProtectedRoute";
import NotSignedInRoute from "./components/NotSignedInRoute";

// Pages
import Home from "./pages/home";
import Start from "./pages/start";
import Matches from "./pages/matches";
import Messages from "./pages/messages";
import Profile from "./pages/profile";
import Edit from "./pages/edit";
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
                <NotSignedInRoute exact path="/" component={Home} />
                <ProtectedRoute
                  exact
                  path="/start"
                  component={Start}
                />
                <ProtectedRoute exact path="/matches" component={Matches} />
                <ProtectedRoute exact path="/messages" component={Messages} />
                <ProtectedRoute exact path="/profile" component={Profile} />
                <ProtectedRoute exact path="/profile/edit" component={Edit} />
                <NotSignedInRoute exact path="/signin" component={Signin} />
                <NotSignedInRoute exact path="/signup" component={Signup} />
                <NotSignedInRoute path="/" component={Home} />
              </Switch>
            </div>
          </UserContext.Provider>
        </Router>
      </header>
    </div>
  );
}

export default App;
