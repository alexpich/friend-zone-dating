import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
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
import UserDetailsService from "../services/userDetails.service";

import { UserContext } from "../context/UserContext";

const SigninForm = () => {
  const initialUserState = {
    email: "",
    password: "",
  };

  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [detailsId, setDetailsId] = React.useState(null);

  const [user, setUser] = useState(initialUserState);
  const [errorMessage, setErrorMessage] = useState(false);

  const history = useHistory();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const signinHandler = (e) => {
    e.preventDefault();
    let data = {
      email: user.email,
      password: user.password,
    };

    AuthService.signin(data.email, data.password)
      .then((response) => {
        setUser({
          email: data.email,
          password: data.password,
        });

        const userFromSession = AuthService.getCurrentUser();

        // Set the context state
        setCurrentUser(userFromSession);
        console.log("successfully logged in");

        UserDetailsService.get(userFromSession.id)
          // UserDetailsService.get(userFromSession.id)
          .then((res) => {
            // setLoading(true);
            const response = res.data[0];
            console.log(response); // setDetailsId(id);
            // console.log(detailsId);
          })
          .catch((e) => {
            console.log(e);
            UserDetailsService.create({
              about: "",
              jobTitle: "",
              school: "",
              location: "",
              gender: "",
              preference: "",
              userId: userFromSession.id,
            }).then(() => {
              setDetailsId(userFromSession.id);
            });
          });
      })
      .catch((e) => {
        setErrorMessage(true);
        console.log("catch: " + e);
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
              fluid
              onClick={signinHandler}
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
