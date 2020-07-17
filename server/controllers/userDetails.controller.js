const db = require("../models");
const UserDetails = db.userDetails;
const Op = db.Sequelize.Op;

// Create and post the details in the DB
exports.create = (req, res) => {
  const user = {
    about: req.body.about,
    jobTitle: req.body.jobTitle,
    school: req.body.school,
    location: req.body.location,
    gender: req.body.gender,
    preference: req.body.preference,
    userId: req.body.userId,
  };

  UserDetails.create(user)
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "An error occurred while creating the user details.",
      });
    });
};

// Retrieves all UserDetails of Current User
exports.findAllByUser = (req, res) => {
  const id = req.params.id;

  UserDetails.findAll({
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
          err.message || "Some error occurred while retrieving user details.",
      });
    });
};

// Update UserDetails by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  UserDetails.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Details were updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update User details with user id=${id}. Maybe User details were not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating User details with user id=" + id,
      });
    });
};
