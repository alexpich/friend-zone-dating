const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models");
db.sequelize.sync();
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Welcome." });
});

// Routes
require("./app/routes/auth.routes")(app);
require("./routes/user.routes")(app);

// Port
app.listen(port, () => console.log(`Server listening on port ${port}`));

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
