import React from "react";
import { Grid } from "semantic-ui-react";

import SidebarNav from "../components/SidebarNav";
import EditProfileComponent from "../components/EditProfileComponent";

const Edit = () => (
  <div className="container">
    <Grid columns={2} stackable>
      <Grid.Column width={4}>
        <SidebarNav />
      </Grid.Column>
      <Grid.Column>
        <EditProfileComponent />
      </Grid.Column>
    </Grid>
  </div>
);

export default Edit;
