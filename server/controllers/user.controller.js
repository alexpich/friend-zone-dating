const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;

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
// TODO: filter by search distance
exports.findTwentyUsersNearby = (req, res) => {
  // console.log("\n\n\n\n" + JSON.stringify(req.params) + "\n\n\n\n");
  console.log("\n\n\n\n" + req.params.id + "\n\n\n\n");
  // console.log(req.params.id);

  let currentUserId = req.params.id;

  // TODO: Only display users within current user's search radius.
  User.scope("withoutPassword")
    .findAll({
      where: {
        id: {
          [Op.not]: currentUserId,
        },
      },
      limit: 20,
      include: [
        { model: db.image, required: true },
        { model: db.like, required: false },
        // { model: db.userDetails, required: false },
      ],
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

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with id=" + id,
      });
    });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Users were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all users.",
      });
    });
};
