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

const SigninForm = () => (
  <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as="h2" color="red" textAlign="center">
        <Image src="/logo.png" /> Sign In To Your Account
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
          <Form.Input
            fluid
            icon="lock"
            iconPosition="left"
            placeholder="Confirm Password"
            type="password"
          />

          <Button color="red" fluid size="large">
            Sign In
          </Button>
        </Segment>
      </Form>
      <Message>
        New to us?{" "}
        <Link to="/signup">
          <a>Sign Up</a>
        </Link>
      </Message>
    </Grid.Column>
  </Grid>
);

export default SigninForm;
