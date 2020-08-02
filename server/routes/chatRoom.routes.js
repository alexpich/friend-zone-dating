const express = require("express");
const models = require("../models");
// const router = express.Router();
const chatroom = require("../controllers/chatRoom.controller");

module.exports = (app) => {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  var router = require("express").Router();

  /* GET users listing. */
  router.get("/chatrooms", chatroom.getChatRooms);

  router.get("/chatroom/messages/:chatRoomName", chatroom.getChatRoomMessages);

  router.post("/chatroom", chatroom.joinRoom);

  app.use("/", router);
};
