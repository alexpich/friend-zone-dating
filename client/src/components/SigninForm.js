import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";

import AuthService from "../services/auth.service";

const SigninForm = () => {
  const initialUserState = {
    email: "",
    password: "",
  };

  const [user, setUser] = useState(initialUserState);
  const [errorMessage, setErrorMessage] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const triggerSignIn = (e) => {
    e.preventDefault();
    let data = {
      email: user.email,
      password: user.password,
    };

    AuthService.signin(data.email, data.password)
      .then((response) => {
        setUser({
          email: response.email,
          password: response.password,
        });

        console.log("successfully logged in");
        
        setUser(initialUserState);
      })
      .catch((e) => {
        setErrorMessage(true);
        console.log(e);
      });
  };

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        {errorMessage ? (
          <Message color="red">
            Email and password combination incorrect! Please try again.
          </Message>
        ) : (
          ""
        )}
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
              value={user.email}
              onChange={handleInputChange}
              name="email"
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              value={user.password}
              onChange={handleInputChange}
              name="password"
            />
            <Button
              color="red"
              size="small"
              onClick={triggerSignIn}
              disabled={!user.email || !user.password}
            >
              Sign In
            </Button>
          </Segment>
        </Form>
        <Message>
          New to us? <Link to="/signup">Sign Up</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default SigninForm;
