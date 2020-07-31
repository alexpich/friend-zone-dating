const db = require("../models");
const { Sequelize } = require("sequelize");
const User = db.user;
const Likes = db.like;
// const Op = db.Sequelize.Op;
const { Op } = require("sequelize");

// Retrieve all user from the database.
exports.findAll = (req, res) => {
  const email = req.query.email;
  let condition = email ? { email: { [Op.like]: `%${email}%` } } : null;

  User.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    });
};

// Retrieve 20 users from the database where the location is within a certain amount
exports.findTwentyUsersNearby = (req, res) => {
  let currentUserId = req.params.id;

  // TODO: Only display users within current user's search radius.
  // Get all the users (w/ images and likes) and then only display the ones that havent been liked by currentUser
  const users = User.scope("withoutPassword")
    .findAll({
      include: [
        { model: db.image, required: true },
        {
          model: db.like,
          required: false,
        },
        // { model: db.userDetails, required: false },
      ],
      where: {
        id: {
          [Op.ne]: currentUserId,
          [Op.not]: [
            Sequelize.literal(
              "(SELECT likes.otherUserId from likes where likes.userId = " +
                currentUserId +
                ")"
            ),
          ],
        },
      },
      required: false,
      limit: 20,
    })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    });
};

// Find a single User with an id within a search radius
// TODO: filter by search distance
exports.findOneNearby = (req, res) => {
  User.scope("withoutPassword")
    .findAll({
      limit: 2,
      include: [{ model: db.image, required: false }],
    })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "There was an error retrieving a nearby user",
      });
    });
};

// Retrieve users where (userId and otherUserId) and (liked === 1 or 2)
exports.findAllMatches = (req, res) => {
  let currentUserId = req.params.id;

  const users = User.scope("withoutPassword")
    .findAll({
      include: [
        { model: db.image, required: true, attributes: [] },
        {
          model: db.like,
          required: false,
          attributes: [],
        },
      ],
      where: {
        id: {
          [Op.ne]: currentUserId,
          // [Op.or]: [
          //   // A Like
          //   Sequelize.literal(
          //     "users.id IN (SELECT likes.otherUserId from likes where likes.liked = " +
          //       1 +
          //       ")"
          //   ),
          //   // A SuperLike
          //   Sequelize.literal(
          //     "users.id IN (SELECT likes.otherUserId from likes where likes.liked = " +
          //       2 +
          //       ")"
          //   ),
          // ],
          // /*
          [Op.and]: [
            // OtherUser Likes you
            // Sequelize.literal(
            //   "users.id IN (SELECT likes.otherUserId from likes where likes.userId = " +
            //     currentUserId +
            //     ")"
            // ),
            // // You like OtherUser
            // Sequelize.literal(
            //   "users.id IN (SELECT likes.userId from likes where likes.otherUserId = " +
            //     currentUserId +
            //     ")"
            // ),
            Sequelize.literal(
              "SELECT a.userId, a.otherUserId FROM likes a INNER JOIN likes b ON a.userId = b.otherUserId AND b.userId = a.otherUserId"
            ),
          ],
          // */
        },
      },
      required: false,
      limit: 20,
    })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving matches.",
      });
    });
};

// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.scope("withoutPassword")
    .findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id,
      });
    });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating User with id=" + id,
      });
    });
};
