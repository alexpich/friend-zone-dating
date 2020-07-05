const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");

// function validateEmail(email) {
//   const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//   return re.test(email);
// }

// Returns true if valid email
function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

// Returns true if valid firstName
function validateFirstName(firstName) {
  const re = /^[a-zA-Z]{2,30}$/;
  return re.test(firstName);
}

// Returns true if valid lastName
function validateLastName(lastName) {
  const re = /^[a-zA-Z]{2,30}$/;
  return re.test(lastName);
}

// Returns true if valid password
function validatePassword(password) {
  // Must contain 1 digit, 1+ lowercase, 1+ uppercase, 6+ characters
  const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,20}$/;
  return re.test(password);
}

// Returns true if valid
function validate(email, firstName, lastName, password) {
  let numErrors = 0;
  if (!validateEmail(email)) {
    numErrors++;
  }

  if (!validateFirstName(firstName)) {
    numErrors++;
  }

  if (!validateLastName(lastName)) {
    numErrors++;
  }

  if (!validatePassword(password)) {
    numErrors++;
  }

  console.log(numErrors);

  if (numErrors > 0) {
    return false;
  }
  return true;
}

exports.signup = (req, res) => {
  // if (validateEmail(req.body.email) === true) {
  if (
    validate(
      req.body.email,
      req.body.firstName,
      req.body.lastName,
      req.body.password
    )
  ) {
    // Save User to Database
    User.create({
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: bcrypt.hashSync(req.body.password, 8),
    })
      .then((user) => {
        if (req.body.roles) {
          Role.findAll({
            where: {
              name: {
                [Op.or]: req.body.roles,
              },
            },
          }).then((roles) => {
            user.setRoles(roles).then(() => {
              res.send({ message: "User was registered successfully!" });
            });
          });
        } else {
          // user role = 1
          user.setRoles([1]).then(() => {
            res.send({ message: "User was registered successfully!" });
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "An error occurred while creating the User.",
        });
      });
  } else {
    console.log(`There are: ${numErrors} errors in the form.`);
  }
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      const oneYear = 1000 * 60 * 60 * 24 * 365;
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: oneYear, // 1 year
      });

      var authorities = [];
      user.getRoles().then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          email: user.email,
          roles: authorities,
          accessToken: token,
        });
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
