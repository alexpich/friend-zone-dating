import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const NotSignedInRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useContext(UserContext);
  const isAuthenticated = currentUser;

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Redirect
            to={{ pathname: "/friendzone", state: { from: props.location } }}
          />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default NotSignedInRoute;
