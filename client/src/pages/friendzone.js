import React from "react";
import { Grid } from "semantic-ui-react";

import SidebarNav from "../components/SidebarNav";
import FriendZoneComponent from "../components/FriendZoneComponent";
import CreateUserDetailsForm from "../components/CreateUserDetailsForm";

import { UserContext } from "../context/UserContext";
import UserDetailsService from "../services/userDetails.service";

const FriendZone = () => {
  return (
    <div className="container">
      <Grid columns={2} stackable>
        <Grid.Column width={4}>
          <SidebarNav />
        </Grid.Column>
        <Grid.Column>
          <FriendZoneComponent />
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default FriendZone;
