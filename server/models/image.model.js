module.exports = (sequelize, Sequelize) => {
  const Image = sequelize.define("images", {
    url: {
      type: Sequelize.STRING,
    },
    order: {
      type: Sequelize.TINYINT,
    },
  });

  return Image;
};
