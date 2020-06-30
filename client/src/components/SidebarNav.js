import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "semantic-ui-react";

import styled from "styled-components";

const SidebarNavStyles = styled.div`
  /* background: #ededed; */
`;

class SidebarNav extends Component {
  render() {
    return (
      <SidebarNavStyles>
        <Menu secondary vertical>
          <Menu.Item name="home" exact as={NavLink} to="/" />
          <Menu.Item as={NavLink} exact to="/messages" name="messages" />
          <Menu.Item as={NavLink} exact to="/friends" name="friends" />
        </Menu>
      </SidebarNavStyles>
    );
  }
}

export default SidebarNav;
