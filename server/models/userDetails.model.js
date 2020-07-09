module.exports = (sequelize, Sequelize) => {
  const UserDetails = sequelize.define("user_details", {
    about: {
      type: Sequelize.TEXT,
    },
    jobTitle: {
      type: Sequelize.STRING,
    },
    school: {
      type: Sequelize.STRING,
    },
    location: {
      type: Sequelize.STRING,
    },
    gender: {
      type: Sequelize.STRING,
    },
    sexualOrientation: {
      type: Sequelize.STRING,
    },
  });

  return UserDetails;
};
