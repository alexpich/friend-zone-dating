import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { Button, Grid } from "semantic-ui-react";

import HomeBg from "../assets/home-bg.jpg";

const HomeStyles = styled.div`
  background-image: url(${HomeBg});
  background-size: cover;
  background-repeat: no-repeat;
  width: 100vw;
  height: 100vh;
  /* margin-top: -4rem; */
  Button > a {
    color: white;
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
        <Grid.Column style={{ maxWidth: 450 }}>
          <Button color="red" size="large">
            <Link to="/signup">Sign Up</Link>
          </Button>
        </Grid.Column>
      </Grid>
    </HomeStyles>
  );
};

export default HomeComponent;
