import React from "react";
import { Grid } from "semantic-ui-react";

import SidebarNav from "../components/SidebarNav";
import MessagesComponent from "../components/MessagesComponent";

const Messages = () => (
  <div className="container">
    <Grid columns={2} stackable>
      <Grid.Column width={4}>
        <SidebarNav />
      </Grid.Column>
      <Grid.Column>
        <MessagesComponent />
      </Grid.Column>
    </Grid>
  </div>
);

export default Messages;
