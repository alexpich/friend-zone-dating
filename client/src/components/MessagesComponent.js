import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import http from "../http-common";

const MessagesComponent = () => {
  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = socketIOClient(http.baseUrl);
    socket.on("FromAPI", (data) => {
      setResponse(data);
    });

    // Clean up
    return () => socket.disconnect();
  }, []);

  return (
    <div>
      <h1>MessagesComponent</h1>
      <p>list of messages</p>
      <p>click on message-item to display full screen messages</p>
      <p>
        It's <time dateTime={response}>{response}</time>
      </p>
    </div>
  );
};

export default MessagesComponent;
