import React from "react";
import Link from "react-router-dom/Link";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";

const SignupForm = () => (
  <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as="h2" color="red" textAlign="center">
        <Image src="/logo.png" /> Create An Account
      </Header>
      <Form size="large">
        <Segment stacked>
          <Form.Input
            fluid
            icon="user"
            iconPosition="left"
            placeholder="E-mail address"
          />
          <Form.Input
            fluid
            icon="lock"
            iconPosition="left"
            placeholder="Password"
            type="password"
          />

          <Button color="red" fluid size="large">
            Sign Up
          </Button>
        </Segment>
      </Form>
      <Message>
        Already have an account?{" "}
        <Link to="/signin">
          <a>Sign In</a>
        </Link>
      </Message>
    </Grid.Column>
  </Grid>
);

export default SignupForm;
