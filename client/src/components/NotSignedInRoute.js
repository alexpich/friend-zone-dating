import React from "react";
import { Route, Redirect } from "react-router-dom";
import AuthService from "../services/auth.service";

const NotSignedInRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = AuthService.getCurrentUser();

  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/lovezone", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default NotSignedInRoute;
