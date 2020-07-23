import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Sidebar,
  Segment,
  Icon,
  Checkbox,
  Grid,
  Menu,
} from "semantic-ui-react";

import styled from "styled-components";

const SidebarNavStyles = styled.div`
  /* background: #ededed; */
`;

const SidebarNav = () => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Grid columns={1}>
        {/* <Grid.Column>
          <Checkbox
            checked={visible}
            label={{ children: <code>visible</code> }}
            onChange={(e, data) => setVisible(data.checked)}
          />
        </Grid.Column> */}

        <Grid.Column>
          {/* <Sidebar.Pushable as={Segment}> */}
            <Sidebar
              as={Menu}
              animation="overlay"
              icon="labeled"
              inverted
              // onHide={() => setVisible(false)}
              vertical
              visible
              width="thin"
            >
              <Menu.Item
                as={NavLink}
                exact
                to="/friendzone"
                name="friendzone"
              />
              <Menu.Item
                as={NavLink}
                exact
                to="/friendzone"
                name="friendzone"
              />
              <Menu.Item as={NavLink} exact to="/matches" name="matches" />
              <Menu.Item as={NavLink} exact to="/messages" name="messages" />
              <Menu.Item as={NavLink} exact to="/profile" name="profile" />
            </Sidebar>

            <Sidebar.Pusher>
              <Segment basic>
                <p>test</p>
              </Segment>
            </Sidebar.Pusher>

          {/* </Sidebar.Pushable> */}
        </Grid.Column>
      </Grid>
    </>
  );
};

export default SidebarNav;
