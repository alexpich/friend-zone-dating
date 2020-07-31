import React from "react";
import { NavLink } from "react-router-dom";
import { Sidebar, Segment, Grid, Menu } from "semantic-ui-react";

const SidebarNav = () => {
  return (
    <>
      <Grid columns={1}>
        <Grid.Column>
          <Sidebar
            as={Menu}
            animation="overlay"
            icon="labeled"
            inverted
            vertical
            visible
            width="thin"
          >
            <Menu.Item as={NavLink} exact to="/start" name="start" />
            <Menu.Item as={NavLink} exact to="/start" name="start" />
            <Menu.Item as={NavLink} exact to="/matches" name="matches" />
            <Menu.Item as={NavLink} exact to="/messages" name="messages" />
            <Menu.Item as={NavLink} exact to="/profile" name="profile" />
          </Sidebar>

          <Sidebar.Pusher>
            <Segment basic>
              <p>test</p>
            </Segment>
          </Sidebar.Pusher>
        </Grid.Column>
      </Grid>
    </>
  );
};

export default SidebarNav;
