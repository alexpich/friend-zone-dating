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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const [user, setUser] = useState(initialUserState);

  const triggerSignIn = (e) => {
    let data = {
      email: user.email,
      password: user.password,
    };

    AuthService.signin(data)
      .then((response) => {
        setUser({
          email: response.data.email,
          password: response.data.password,
        });
        console.log("success");
        console.log(response.data);
        setUser(initialUserState);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
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
            <Button color="red" size="small" onClick={triggerSignIn}>
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
