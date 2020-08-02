const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

// Socket and app server
const server = app.listen(port, () => console.log(`Listening on port ${port}`));
const io = require("socket.io")(server);

var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models");
const Role = db.role;

// Use this one in prod, create initial user/admin roles manually
db.sequelize.sync();

// We can use this one in dev to force drop all db
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
//   initial();
// });

// Routes
require("./routes/auth.routes")(app);
require("./routes/image.routes")(app);
require("./routes/likes.routes")(app);
require("./routes/user.routes")(app);
require("./routes/userDetails.routes")(app);
var chatRoomRouter = require("./routes/chatRoom.routes");

app.use("/chatroom", chatRoomRouter);

// Test route
app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

// Socket
// let interval;

// io.on("connection", (socket) => {
//   console.log("New client connected");
//   if (interval) {
//     clearInterval(interval);
//   }
//   interval = setInterval(() => getApiAndEmit(socket), 1000);
//   socket.on("disconnect", () => {
//     console.log("Client disconnected");
//     clearInterval(interval);
//   });
// });

io.on("connection", (socket) => {
  socket.on("join", async (room) => {
    socket.join(room);
    io.emit("roomJoined", room);
  });
  socket.on("message", async (data) => {
    const { chatRoomName, author, message } = data;
    const chatRoom = await models.ChatRoom.findAll({
      where: { name: chatRoomName },
    });
    const chatRoomId = chatRoom[0].id;
    const chatMessage = await models.ChatMessage.create({
      chatRoomId,
      author,
      message: message,
    });
    io.emit("newMessage", chatMessage);
  });
});

// Socket Emit
// const getApiAndEmit = (socket) => {
//   const response = new Date();
//   // Emitting a new message. Will be consumed by the client
//   socket.emit("FromAPI", response);
// };

// Port
// app.listen(port, () => console.log(`Server listening on port ${port}`));

// Create roles
function initial() {
  Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "admin",
  });
}

module.exports = app;
