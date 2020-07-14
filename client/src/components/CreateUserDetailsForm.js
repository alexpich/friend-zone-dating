import React, { useState, useContext } from "react";
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
  Icon,
  TextArea,
} from "semantic-ui-react";
import Select from "react-select";

import UserDetailsService from "../services/userDetails.service";
import { UserContext } from "../context/UserContext";

const CreateUserDetailsForm = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  //Initial user details
  const initialUserDetails = {
    about: "I like long walks on the beach and gazing upon the stars...",
    jobTitle: "",
    school: "",
    location: "",
    gender: "",
    preference: "",
    userId: currentUser.id,
  };

  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  //   User Details
  const [userDetails, setUserDetails] = useState(initialUserDetails);

  // Select options
  const genderOptions = [
    { value: "Man", label: "Man" },
    { value: "Woman", label: "Woman" },
    { value: "Other", label: "Other" },
  ];

  const preferenceOptions = [
    { value: "Men", label: "Men" },
    { value: "Women", label: "Women" },
    { value: "Any", label: "Any" },
  ];

  const handleUserDetailsInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  const handleSelectChange = (value, action) => {
    setUserDetails({
      ...userDetails,
      [action.name]: value.value,
    });
  };

  const saveUser = (e) => {
    e.preventDefault();

    setIsLoading(true);

    UserDetailsService.create(userDetails)
      .then((response) => {
        console.log("User created successfully");
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="red" textAlign="center">
          <Image src="/logo.png" /> Your Profile
        </Header>
        <Form size="large">
          <Segment stacked>
            <TextArea
              className="about"
              name="about"
              placeholder="Tell us about yourself..."
              style={{ minHeight: 100, maxHeight: 100 }}
              maxLength={500}
              value={userDetails.about}
              onChange={handleUserDetailsInputChange}
            />
            <Form.Input
              name="jobTitle"
              placeholder="Add Job Title"
              fluid
              icon="briefcase"
              iconPosition="left"
              value={userDetails.jobTitle}
              onChange={handleUserDetailsInputChange}
              required
            />
            <Form.Input
              name="school"
              placeholder="Add School"
              fluid
              icon="university"
              iconPosition="left"
              value={userDetails.school}
              onChange={handleUserDetailsInputChange}
            />

            <Form.Input
              name="location"
              placeholder="Add Location"
              fluid
              icon="location arrow"
              iconPosition="left"
              value={userDetails.location}
              onChange={handleUserDetailsInputChange}
            />

            <Select
              name="gender"
              placeholder="Gender"
              options={genderOptions}
              defaultValue={userDetails.gender}
              onChange={handleSelectChange}
            />

            <Select
              name="preference"
              placeholder="Preference"
              options={preferenceOptions}
              defaultValue={userDetails.preference}
              onChange={handleSelectChange}
            />

            <Button
              color="red"
              onClick={saveUser}
              // disabled={}
            >
              {isLoading ? "Loading..." : "Save"}
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

export default CreateUserDetailsForm;
