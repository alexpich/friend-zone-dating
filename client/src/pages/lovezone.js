import React from "react";
import { Grid } from "semantic-ui-react";

import SidebarNav from "../components/SidebarNav";
import LoveZoneComponent from "../components/LoveZoneComponent";
import ProtectedRoute from "../components/ProtectedRoute";

const Matches = () => (
  <ProtectedRoute>
    <Grid columns={2} stackable>
      <Grid.Column width={4}>
        <SidebarNav />
      </Grid.Column>
      <Grid.Column>
        <LoveZoneComponent />
      </Grid.Column>
    </Grid>
  </ProtectedRoute>
);

export default Matches;
