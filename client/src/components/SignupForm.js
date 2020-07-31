import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import AuthService from "../services/auth.service";

const PwCaption = styled.p`
  color: #a0a0a0;
  text-align: left;
  font-size: 0.8rem;
  margin-top: -0.8rem;
`;

const SignupForm = (props) => {
  const initialUserState = {
    id: null,
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    latitude: null,
    longitude: null,
  };
  const [birthdate, setBirthdate] = useState(new Date());

  const initialErrorState = {
    error: false,
    emailError: false,
    firstNameError: false,
    lastNameError: false,
    passwordError: false,
  };

  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  // User data
  const [user, setUser] = useState(initialUserState);

  // Form submission (save user data to db)
  const [saved, setSaved] = useState(false);

  // Entire Form Error check
  const [error, setError] = useState(false);

  // Error Message above form
  const [errorMessage, setErrorMessage] = useState("");

  // Input Error Check
  const [emailError, setEmailError] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleUserInputChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleBirthdateChange = (e) => {
    setBirthdate(e);
    console.log(e);
  };
  // Returns true if valid email
  function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email)) {
      setEmailError(false);
      return true;
    }
    setEmailError(true);
    return false;
  }

  // Returns true if valid firstName
  function validateFirstName(firstName) {
    const re = /^[a-zA-Z]{2,30}$/;
    if (re.test(firstName)) {
      setFirstNameError(false);
      return true;
    }
    setFirstNameError(true);
    return false;
  }

  // Returns true if valid lastName
  function validateLastName(lastName) {
    const re = /^[a-zA-Z]{2,30}$/;
    if (re.test(lastName)) {
      setLastNameError(false);
      return true;
    }
    setLastNameError(true);
    return false;
  }

  // Returns true if valid password
  function validatePassword(password) {
    // Must contain 1 digit, 1+ lowercase, 1+ uppercase, 6+ characters
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,20}$/;
    if (re.test(password)) {
      setPasswordError(false);
      return true;
    }
    setPasswordError(true);
    return false;
  }

  // Returns true if valid
  function validate(email, firstName, lastName, password) {
    let numErrors = 0;
    if (!validateEmail(email)) {
      numErrors++;
    }

    if (!validateFirstName(firstName)) {
      numErrors++;
    }

    if (!validateLastName(lastName)) {
      numErrors++;
    }

    if (!validatePassword(password)) {
      numErrors++;
    }

    if (numErrors > 0) {
      return false;
    }
    return true;
  }

  const saveUser = (e) => {
    e.preventDefault();

    let data = {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      password: user.password,
      latitude: user.latitude,
      longitude: user.longitude,
    };

    const isValid = validate(
      data.email,
      data.firstName,
      data.lastName,
      data.password
    );

    setIsLoading(true);
    if (isValid) {
      AuthService.signup(
        data.email,
        data.firstName,
        data.lastName,
        data.password,
        birthdate,
        data.latitude,
        data.longitude
      )
        .then((response) => {
          setUser({
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            password: data.password,
            date: data.date,
            latitude: data.latitude,
            longitude: data.longitutde,
          });

          console.log("User created successfully");

          setSaved(true);

          //  Dont Clear Form
          // setUser(initialUserState);
          
          setError(false);
          setEmailError(false);
          setFirstNameError(false);
          setPasswordError(false);
        })
        .catch((e) => {
          setUser(initialUserState);
          setError(true);
          setErrorMessage(e.response.data.message);
          setEmailError(initialErrorState.email);
          setFirstNameError(initialErrorState.firstName);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  };

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        {saved && error === false ? (
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
              onChange={handleUserInputChange}
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
              onChange={handleUserInputChange}
              name="firstName"
            />
            {firstNameError ? (
              <Message color="red">
                First name must be within 2-30 characters!
              </Message>
            ) : (
              ""
            )}
            <Form.Input
              fluid
              icon="address card"
              iconPosition="left"
              placeholder="Last Name"
              value={user.lastName}
              onChange={handleUserInputChange}
              name="lastName"
            />
            {lastNameError ? (
              <Message color="red">
                Last name must be within 2-30 characters!
              </Message>
            ) : (
              ""
            )}
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              value={user.password}
              onChange={handleUserInputChange}
              name="password"
            />
            <PwCaption>
              Passwords must be 6-20 characters and contain one digit, one
              lowercase, and one uppercase letter.
            </PwCaption>
            {passwordError ? (
              <Message color="red">
                Passwords must be 6-20 characters and contain one digit, one
                lowercase, and one uppercase letter!
              </Message>
            ) : (
              ""
            )}

            <DatePicker selected={birthdate} onChange={handleBirthdateChange} />

            {/* Profile Photo */}

            <Button
              color="red"
              fluid
              onClick={saveUser}
              disabled={
                !user.email ||
                !user.firstName ||
                !user.lastName ||
                !user.password
              }
            >
              {isLoading ? "Loading..." : "Sign Up"}
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
