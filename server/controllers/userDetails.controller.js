const db = require("../models");
const userDetails = db.userDetails;
const Op = db.Sequelize.Op;

// Create and post the details in the DB
exports.create = (req, res) => {};

// Retrieves all UserDetails of Current User
exports.findAllByUser = (req, res) => {
  //   const imageId = req.query.id;
  //   var condition = imageId ? { id: { [Op.like]: `%${imageId}%` } } : null;
  //   const id = req.params.id;
  //   Image.findAll({
  //     where: {
  //       userId: id,
  //     },
  //   })
  //     .then((data) => {
  //       res.send(data);
  //     })
  //     .catch((err) => {
  //       res.status(500).send({
  //         message: err.message || "Some error occurred while retrieving Images.",
  //       });
  //     });
};

// Update UserDetails by the id in the request
exports.update = (req, res) => {
  //   const id = req.params.id;
  //   Image.update(req.body, {
  //     where: { id: id },
  //   })
  //     .then((num) => {
  //       if (num == 1) {
  //         res.send({
  //           message: "Image was updated successfully.",
  //         });
  //       } else {
  //         res.send({
  //           message: `Cannot update Image with id=${id}. Maybe Image was not found or req.body is empty!`,
  //         });
  //       }
  //     })
  //     .catch((err) => {
  //       res.status(500).send({
  //         message: "Error updating Image with id=" + id,
  //       });
  //     });
};
