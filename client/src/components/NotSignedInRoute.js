import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import AuthService from "../services/auth.service";

const NotSignedInRoute = ({ component: Component, ...rest }) => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const isAuthenticated = currentUser;
  // const isAuthenticated = AuthService.getCurrentUser();

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
