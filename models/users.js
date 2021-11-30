const Sequelize = require("sequelize");

module.exports = class Users extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        email: {
          primaryKey: true,
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        password: {
          allowNull: false,
          type: Sequelize.STRING(500),
        },
      },
      {
        sequelize,
        timestamps: false,
        modelName: "Users",
        tableName: "users",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  // 테이블간 관계 설정
  static associate(db) {
    db.Users.hasMany(db.Assets, {
      foreignKey: "email",
      sourceKey: "email",
    });
    db.Users.hasMany(db.ApiKeys, {
      foreignKey: "email",
      sourceKey: "email",
    });
    db.Users.hasMany(db.Comments, {
      foreignKey: "email",
      sourceKey: "email",
    });
  }
};
