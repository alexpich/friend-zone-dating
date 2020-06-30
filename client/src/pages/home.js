import React, { Component } from "react";

import { Grid, Container } from "semantic-ui-react";

import HomeStyles from "../components/styles/HomeStyles";
import SidebarNav from "../components/SidebarNav";
import NewsFeed from "../components/NewsFeed";

class Home extends Component {
  render() {
    return (
      // <HomeStyles>
      <Grid columns={2} stackable>
        <Grid.Column width={4}>
          <SidebarNav />
        </Grid.Column>
        <Grid.Column>
          <NewsFeed />
        </Grid.Column>
      </Grid>
      // </HomeStyles>
    );
  }
}

export default Home;
