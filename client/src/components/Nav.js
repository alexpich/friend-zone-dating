import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "semantic-ui-react";

import AuthService from "../services/auth.service";
import { UserContext } from "../context/UserContext";

const Nav = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const retrievedUser = AuthService.getCurrentUser();

  // setCurrentUser(user);

  // const login = async () => {
  // const user = await AuthService.getCurrentUser();
  // setCurrentUser(user);
  // };
  // const [isSignedIn, setIsSignedIn] = useState(false);
  // const [currentUser, setCurrentUser] = useState(user ? user : null);

  const logout = () => {
    AuthService.signout();
    // setIsSignedIn(false);
    setCurrentUser(null);
  };

  // if there is a currentUser then set isSignedIn to true
  // useEffect(() => {
  //   if (currentUser) {
  //     setIsSignedIn(!isSignedIn);
  //   }
  // }, []);

  // useEffect(() => {
  //   if (isSignedIn) {
  //     setIsSignedIn(true);
  //   }
  // }, []);

  return (
    <Menu secondary fixed="top">
      {currentUser ? (
        <>
          <Menu.Item name="home" exact as={NavLink} to="/" />
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
