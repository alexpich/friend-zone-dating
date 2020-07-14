const db = require("../models");
const Likes = db.like;
const Op = db.Sequelize.Op;

// Create and post the "like/dislike" to the DB
exports.create = (req, res) => {
  const like = {
    userId: req.body.userId,
    otherUserId: req.body.otherUserId,
    liked: req.body.liked,
  };

  Likes.create(like)
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "An error occurred while creating the Like.",
      });
    });
};

// Retrieves all likes of Current User
exports.findAllByUser = (req, res) => {
  const id = req.params.id;

  Likes.findAll({
    where: {
      userId: id,
    },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving user's Likes.",
      });
    });
};

// Update likes by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Likes.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      console.log(num);
      if (num == 1) {
        res.send({
          message: "Details were updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Likes with id=${id}. Maybe Like was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Likes with id=" + id,
      });
    });
};
