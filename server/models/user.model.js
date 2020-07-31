module.exports = (sequelize, Sequelize) => {
  // TODO: Age
  const User = sequelize.define(
    "users",
    {
      email: {
        type: Sequelize.STRING,
      },
      firstName: {
        type: Sequelize.STRING,
      },
      lastName: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      birthdate: {
        type: Sequelize.DATEONLY,
      },
      latitude: {
        type: Sequelize.DECIMAL(10, 7),
      },
      longitude: {
        type: Sequelize.DECIMAL(10, 7),
      },
    },
    {
      scopes: {
        withoutPassword: {
          attributes: { exclude: ["password"] },
        },
      },
    }
  );

  return User;
};
