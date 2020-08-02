const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models
db.image = require("./image.model.js")(sequelize, Sequelize);
db.like = require("./likes.model.js")(sequelize, Sequelize);
db.role = require("./role.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);
db.userDetails = require("./userDetails.model.js")(sequelize, Sequelize);
db.chatroom = require("./chatroom")(sequelize, Sequelize);
db.chatroommessages = require("./chatroommessages")(sequelize, Sequelize);

// Relations
db.image.belongsTo(db.user);
db.user.hasMany(db.image);

db.like.belongsTo(db.user);
db.user.hasMany(db.like);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId",
});

db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId",
});

db.userDetails.belongsTo(db.user);
db.user.hasOne(db.userDetails);

// Roles
db.ROLES = ["user", "admin"];

module.exports = db;
