import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { Input, Menu } from "semantic-ui-react";

class Nav extends Component {
  state = { activeItem: "home" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Menu secondary>
        <Menu.Item
          name="home"
          as={NavLink}
          to="/"
          active={activeItem === "home"}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          as={NavLink}
          to="/signin"
          name="signin"
          active={activeItem === "signin"}
          onClick={this.handleItemClick}
        />
      </Menu>
    );
  }
}

export default Nav;
