module.exports = (sequelize, Sequelize) => {
  const Likes = sequelize.define("likes", {
    otherUserId: {
      type: Sequelize.INTEGER,
    },
    liked: {
      type: Sequelize.TINYINT,
    },
  });

  return Likes;
};
