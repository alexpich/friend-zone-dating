module.exports = (sequelize, Sequelize) => {
  const Likes = sequelize.define("likes", {
    userId: {
      type: Sequelize.INTEGER,
    },
    otherUserId: {
      type: Sequelize.INTEGER,
    },
    liked: {
      type: Sequelize.TINYINT,
    },
  });

  return Likes;
};
