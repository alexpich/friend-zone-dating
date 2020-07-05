import React, { Component } from "react";

import { Grid } from "semantic-ui-react";

import SidebarNav from "../components/SidebarNav";
import PotentialMatches from "../components/PotentialMatches";

class Home extends Component {
  render() {
    return (
      <Grid columns={2} stackable>
        <Grid.Column width={4}>
          <SidebarNav />
        </Grid.Column>
        <Grid.Column>
          <PotentialMatches />
        </Grid.Column>
      </Grid>
    );
  }
}

export default Home;
