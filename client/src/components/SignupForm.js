import React, { useState } from "react";
import { Link, Router } from "react-router-dom";
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

const SignupForm = () => {
  const initialUserState = {
    id: null,
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  };

  const [user, setUser] = useState(initialUserState);
  const [saved, setSaved] = useState(false);

  const [error, setError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  const saveUser = (e) => {
    e.preventDefault();
    let data = {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      password: user.password,
    };

    // TODO: Validate password length
    // IF valid email, post to DB
    if (validateEmail(data.email) === true) {
      AuthService.signup(
        data.email,
        data.firstName,
        data.lastName,
        data.password
      )
        .then((response) => {
          setUser({
            id: data.id,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            password: data.password,
          });

          console.log("User created successfully");

          setUser(initialUserState);

          setSaved(true);
          setError(false);
          setEmailError(false);
        })
        .catch((e) => {
          setError(true);
          setErrorMessage(e.response.data.message);
        });
    } else {
      setUser(initialUserState);
      setEmailError(true);
      console.log("Invalid email");
    }
  };

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        {saved && !error ? (
          <Message color="green">
            Account Created! Please <Link to="/signin">sign in</Link> to
            continue.
          </Message>
        ) : (
          ""
        )}
        {error ? <Message color="red">{errorMessage.toString()}</Message> : ""}
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
            {emailError ? (
              <Message color="red">That is not a valid email!</Message>
            ) : (
              ""
            )}
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
