const db = require("../models");
const Image = db.image;
const Op = db.Sequelize.Op;

// Create an image in the DB
exports.create = (req, res) => {
  const image = {
    url: req.body.url,
    order: req.body.order,
    userId: req.body.userId,
  };
  Image.create(image)
    .then((data) => {
    //   console.log(data);
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "An error occurred while creating the Image.",
      });
    });
};

// Retrieve all Images from the database.
exports.findAll = (req, res) => {
  const imageId = req.query.id;
  var condition = imageId ? { id: { [Op.like]: `%${imageId}%` } } : null;

  Image.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Images.",
      });
    });
};

// Retrieves all Images of Current User
exports.findAllByUser = (req, res) => {
  const id = req.params.id;

  Image.findAll({
    where: {
      userId: id,
    },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Images.",
      });
    });
};

// Find a single Image with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Image.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Image with id=" + id,
      });
    });
};

// Update an Image by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Image.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Image was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Image with id=${id}. Maybe Image was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Image with id=" + id,
      });
    });
};

// Delete an Image with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Image.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Image was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Image with id=${id}. Maybe Image was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Image with id=" + id,
      });
    });
};
