import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { Button, Grid } from "semantic-ui-react";

import SignUpButton from "./styles/SignUpButton";
import HomeBg from "../assets/home-bg.jpg";

const HomeStyles = styled.div`
  /* TODO: Optimize and compress bg image */
  background-image: url(${HomeBg});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  /* width: 100vw; */
  /* height: 100vh; */
  /* margin-top: -4rem; */
  color: white;
  h2,
  h3 {
    margin: 0;
    padding: 0;
  }
  h2 {
    font-size: 8rem;
  }
  h3 {
    font-size: 3rem;
    margin-bottom: 2rem;
  }
`;

const HomeComponent = () => {
  return (
    <HomeStyles>
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 1200 }}>
          <h2>Find Your Match</h2>
          <h3>Or Send Them To The FriendZone...</h3>
          <Link to="/signup">
            <SignUpButton>Sign Up</SignUpButton>
          </Link>
          {/* <Button color="red" size="large">
            <Link to="/signup">Sign Up</Link>
          </Button> */}
        </Grid.Column>
      </Grid>
    </HomeStyles>
  );
};

export default HomeComponent;
