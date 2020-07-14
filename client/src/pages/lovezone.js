import React from "react";
import { Grid } from "semantic-ui-react";

import SidebarNav from "../components/SidebarNav";
import LoveZoneComponent from "../components/LoveZoneComponent";
import CreateUserDetailsForm from "../components/CreateUserDetailsForm.js";

import { UserContext } from "../context/UserContext";
import UserDetailsService from "../services/userDetails.service";

const Matches = () => {
  const { currentUser, setCurrentUser } = React.useContext(UserContext);
  
  const detailsId = UserDetailsService.get(currentUser.id);
  return (
    <div className="container">
      <Grid columns={2} stackable>
        <Grid.Column width={4}>
          <SidebarNav />
        </Grid.Column>
        <Grid.Column>
          {currentUser === detailsId.id ? (
            <LoveZoneComponent />
          ) : (
            <CreateUserDetailsForm />
          )}
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default Matches;
