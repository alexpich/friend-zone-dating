import React, { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "semantic-ui-react";

import AuthService from "../services/auth.service";
import { UserContext } from "../context/UserContext";

const Nav = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const userFromSession = AuthService.getCurrentUser();

  useEffect(() => {
    if (userFromSession !== null) {
      setCurrentUser(userFromSession);
    }
  }, []);

  const logout = () => {
    AuthService.signout();
    setCurrentUser(null);
  };

  return (
    <Menu secondary fixed="top">
      {userFromSession !== null ? (
        <>
          <Menu.Item name="friendzone" exact as={NavLink} to="/friendzone" />
          <Menu.Item
            as={NavLink}
            exact
            to="/"
            name="signout"
            onClick={logout}
          />
        </>
      ) : (
        <>
          <Menu.Item name="home" exact as={NavLink} to="/" />
          <Menu.Item as={NavLink} exact to="/signin" name="signin" />
        </>
      )}
    </Menu>
  );
};

export default Nav;
