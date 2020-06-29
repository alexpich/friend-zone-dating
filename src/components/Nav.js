import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "semantic-ui-react";

class Nav extends Component {
  render() {
    return (
      <Menu className="nav" secondary>
        <Menu.Item name="home" exact as={NavLink} to="/" />
        <Menu.Item as={NavLink} exact to="/signin" name="signin" />
      </Menu>
    );
  }
}

export default Nav;
