const express = require("express");
const router = express.Router();

const db = require("../models");
const Chatroom = db.chatroom;
const Chatroommessages = db.chatroommessages;

// /* GET users listing. */
// router.get("/chatrooms", async (req, res, next) => {
//   const chatRooms = await models.ChatRoom.findAll();
//   res.send(chatRooms);
// });

// router.post("/chatroom", async (req, res, next) => {
//   const room = req.body.room;
//   const chatRooms = await models.ChatRoom.findAll({
//     where: { name: room },
//   });
//   const chatRoom = chatRooms[0];
//   if (!chatRoom) {
//     await models.ChatRoom.create({ name: room });
//   }
//   res.send(chatRooms);
// });

// router.get("/chatroom/messages/:chatRoomName", async (req, res, next) => {
//   try {
//     const chatRoomName = req.params.chatRoomName;
//     const chatRooms = await models.ChatRoom.findAll({
//       where: {
//         name: chatRoomName,
//       },
//     });
//     const chatRoomId = chatRooms[0].id;
//     const messages = await models.ChatMessage.findAll({
//       where: {
//         chatRoomId,
//       },
//     });
//     res.send(messages);
//   } catch (error) {
//     res.send([]);
//   }});

exports.getChatRooms = async (req, res, next) => {
  const chatRooms = await Chatroom.findAll();
  res.send(chatRooms);
};

exports.joinRoom = (req, res, next) => {
  const room = req.body.room;
  console.log(room);
  //   const chatRooms = await Chatroom.findAll({
  //     where: { name: room },
  //   });
  //   const chatRoom = chatRooms[0];
  //   if (!chatRoom) {
  //     await Chatroom.create({ name: room });
  //   }
  res.send("hi");
};

exports.getChatRoomMessages = async (req, res, next) => {
  try {
    const chatRoomName = req.params.chatRoomName;
    const chatRooms = await Chatroom.findAll({
      where: {
        name: chatRoomName,
      },
    });
    const chatRoomId = chatRooms[0].id;
    const messages = await Chatroommessages.findAll({
      where: {
        chatRoomId,
      },
    });
    res.send(messages);
  } catch (error) {
    res.send([]);
  }
};
