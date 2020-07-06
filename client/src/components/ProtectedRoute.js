import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const isAuthenticated = currentUser;

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/signin", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
