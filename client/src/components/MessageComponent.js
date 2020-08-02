import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import http from "../http-common";
import ChatService from "../services/chat.service";

const socket = socketIOClient(http.baseUrl);
const getChatData = () => {
  return JSON.parse(localStorage.getItem("chatData"));
};

const MessageComponent = () => {
  // const [response, setResponse] = useState("");

  // useEffect(() => {
  //   const socket = socketIOClient(http.baseUrl);
  //   socket.on("FromAPI", (data) => {
  //     setResponse(data);
  //   });

  //   // Clean up
  //   return () => socket.disconnect();
  // }, []);

  const [initialized, setInitialized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [rooms, setRooms] = useState([]);

  const handleSubmit = async (evt) => {
    // const isValid = await schema.validate(evt);
    // if (!isValid) {
    //   return;
    // }
    const data = Object.assign({}, evt);
    data.chatRoomName = getChatData().chatRoomName;
    data.author = getChatData().handle;
    data.message = evt.message;
    socket.emit("message", data);
  };
  const connectToRoom = () => {
    socket.on("connect", (data) => {
      socket.emit("join", getChatData().chatRoomName);
    });
    socket.on("newMessage", (data) => {
      getMessages();
    });
    setInitialized(true);
  };
  const getMessages = async () => {
    const response = await ChatService.getChatRoomMessages(
      getChatData().chatRoomName
    );
    setMessages(response.data);
    setInitialized(true);
  };
  const getRooms = async () => {
    const response = await ChatService.getChatRooms();
    setRooms(response.data);
    setInitialized(true);
  };
  useEffect(() => {
    if (!initialized) {
      getMessages();
      connectToRoom();
      getRooms();
    }
  });

  return (
    <div>
      <h1>A chat room</h1>
      {/* <p>
        It's <time dateTime={response}>{response}</time>
      </p> */}
      <div className="chat-room-page">
        {rooms ? (
          <>
            <h1>
              Chat Room: {getChatData().chatRoomName}. Chat Handle:{" "}
              {getChatData().handle}
            </h1>
            <div className="chat-box">
              {messages.map((m, i) => {
                return (
                  <div className="col-12" key={i}>
                    <div className="row">
                      <div className="col-2">{m.author}</div>
                      <div className="col">{m.message}</div>
                      <div className="col-3">{m.createdAt}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default MessageComponent;
