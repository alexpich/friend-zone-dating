import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import socketIOClient from "socket.io-client";
import http from "../http-common";

import { Formik } from "formik";
import * as yup from "yup";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";

import ChatService from "../services/chat.service";
import MessageComponent from "../components/MessageComponent";

const schema = yup.object({
  handle: yup.string().required("Handle is required"),
  chatRoomName: yup.string().required("Chat room is required"),
});

const MessagesComponent = () => {
  const [redirect, setRedirect] = useState(false);
  const handleSubmit = async (evt) => {
    const isValid = await schema.validate(evt);
    if (!isValid) {
      return;
    }
    localStorage.setItem("chatData", JSON.stringify(evt));
    await ChatService.joinRoom(evt.chatRoomName);
    setRedirect(true);
  };
  if (redirect) {
    return <Redirect to="/chatroom" />;
  }
  return (
    <div className="home-page">
      <h1>Join Chat</h1>
      <Formik
        validationSchema={schema}
        onSubmit={handleSubmit}
        initialValues={JSON.parse(localStorage.getItem("chatData") || "{}")}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          isInvalid,
          errors,
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Input
              type="text"
              name="handle"
              placeholder="Handle"
              value={values.handle || ""}
              onChange={handleChange}
              isInvalid={touched.handle && errors.handle}
            />
            {errors.firstName ? <Message>{errors.firstName}</Message> : ""}
            <Form.Input
              type="text"
              name="chatRoomName"
              placeholder="Chat Room Name"
              value={values.chatRoomName || ""}
              onChange={handleChange}
              isInvalid={touched.chatRoomName && errors.chatRoomName}
            />
            {errors.chatRoomName ? (
              <Message>{errors.chatRoomName}</Message>
            ) : (
              ""
            )}
            <Button type="submit" style={{ marginRight: "10px" }}>
              Join
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default MessagesComponent;
