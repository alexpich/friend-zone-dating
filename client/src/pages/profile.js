import React from "react";
import { Grid } from "semantic-ui-react";

import SidebarNav from "../components/SidebarNav";
import ProfileComponent from "../components/ProfileComponent";

const Profile = () => (
  <div className="container">
    <Grid columns={2}>
      <Grid.Column width={4}>
        <SidebarNav />
      </Grid.Column>
      <Grid.Column width={10}>
        <ProfileComponent />
      </Grid.Column>
    </Grid>
  </div>
);

export default Profile;
