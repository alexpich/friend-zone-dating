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

import UserDataService from "../services/user.service";

const SignupForm = () => {
  const initialUserState = {
    id: null,
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  };

  const [user, setUser] = useState(initialUserState);
  const [submitted, setSubmitted] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const saveUser = (e) => {
    e.preventDefault();
    let data = {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      password: user.password,
    };

    UserDataService.create(data)
      .then((response) => {
        setUser({
          id: response.data.id,
          email: response.data.email,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          password: response.data.password,
        });
        setSubmitted(true);
        console.log(response.data);
        setUser(initialUserState);
        setSaved(true);
      })
      .catch((e) => {
        console.log(e);
      });

    const newUser = () => {
      setUser(initialUserState);
      setSubmitted(false);
    };
  };

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        {saved ? <Message color="green">Account Created!</Message> : ""}
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
              value={user.email}
              onChange={handleInputChange}
              name="email"
            />
            <Form.Input
              fluid
              icon="address card"
              iconPosition="left"
              placeholder="First Name"
              value={user.firstName}
              onChange={handleInputChange}
              name="firstName"
            />
            <Form.Input
              fluid
              icon="address card"
              iconPosition="left"
              placeholder="Last Name"
              value={user.lastName}
              onChange={handleInputChange}
              name="lastName"
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
              onClick={saveUser}
              disabled={
                !user.email ||
                !user.firstName ||
                !user.lastName ||
                !user.password
              }
            >
              Sign Up
            </Button>
          </Segment>
        </Form>
        <Message>
          Already have an account? <Link to="/signin">Sign In</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default SignupForm;
