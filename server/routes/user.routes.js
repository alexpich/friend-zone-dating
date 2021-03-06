const { authJwt } = require("../middleware");
const users = require("../controllers/user.controller");

module.exports = (app) => {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Router level middleware
  var router = require("express").Router();

  app.use("/api/user", router);

  // Retrieve all Users
  router.get("/", users.findAll);

  // Retrieve Twenty users nearby
  router.get("/twenty/:id", users.findTwentyUsersNearby);

  // Retrieve all matches of currentUser
  router.get("/matches/:id", users.findAllMatches);

  // Retrieve a single User with id
  router.get("/:id", users.findOne);

  // Update a User with id
  router.put("/:id", users.update);
};
