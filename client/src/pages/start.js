import React from "react";
import { Grid } from "semantic-ui-react";

import SidebarNav from "../components/SidebarNav";
import StartComponent from "../components/StartComponent";

const Start = () => {
  return (
    <div className="container">
      <Grid columns={2}>
        <Grid.Column width={4}>
          <SidebarNav />
        </Grid.Column>
        <Grid.Column width={10}>
          <StartComponent />
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default Start;
