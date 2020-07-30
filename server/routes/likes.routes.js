const likes = require("../controllers/likes.controller");

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

  // Create Like
  router.post("/", likes.create);

  // Retrieve all Likes by userId
  router.get("/:id", likes.findAllByUser);

  // Retrieve a single Like with userId
  //   router.get("/:id", likes.findOne);

  // Update a Like with userId
  router.put("/:id", likes.update);

  app.use("/api/likes", router);
};
