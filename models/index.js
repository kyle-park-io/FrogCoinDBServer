const path = require("path");
const Sequelize = require("sequelize");

// Model 불러오기
const Users = require("./users");
const Assets = require("./assets");
const ApiKeys = require("./apiKeys");
const Comments = require("./comments");
const Coins = require("./coins");

const env = process.env.NODE_ENV || "development";

// MySQL connection setting
//const config = require(`${__dirname}/../config/config.js`)[env];
const config = require('../config/config.json')[env];


const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

// db 객체에 모든 테이블 넣기
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Users = Users;
db.Assets = Assets;
db.ApiKeys = ApiKeys;
db.Comments = Comments;
db.Coins = Coins;

// MySQL에 모델 넣기
Users.init(sequelize);
Assets.init(sequelize);
ApiKeys.init(sequelize);
Comments.init(sequelize);
Coins.init(sequelize);

// 관계형 설정
Users.associate(db);
Assets.associate(db);
ApiKeys.associate(db);
Comments.associate(db);

module.exports = db;
