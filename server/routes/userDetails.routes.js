const userDetails = require("../controllers/userDetails.controller");

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

  // Create user details
  router.post("/", userDetails.create);

  // Retrieve all user details by userId
  router.get("/:id", userDetails.findAllByUser);

  //   // Retrieve a single Image with id
  //   router.get("/:id", images.findOne);

  //   // Update a Image with id
  //   router.put("/:id", images.update);

  //   // Delete an Image with id
  //   router.delete("/:id", images.delete);

  app.use("/api/profile/edit/details", router);
};
