const Sequelize = require("sequelize");

module.exports = class ApiKeys extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        no: {
          primaryKey: true,
          type: Sequelize.INTEGER,
          autoIncrement: true,
          allowNull: false,
        },
        email: {
          primaryKey: true,
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        exchange: {
          primaryKey: true,
          allowNull: false,
          type: Sequelize.STRING(45),
        },
        accessKey: {
          allowNull: true,
          type: Sequelize.STRING(100),
        },
        secretKey: {
          allowNull: true,
          type: Sequelize.STRING(100),
        },
      },
      {
        sequelize,
        timestamps: false,
        modelName: "ApiKeys",
        tableName: "apiKeys",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  // 테이블간 관계 설정
  static associate(db) {
    db.ApiKeys.hasMany(db.Assets, {
      foreignKey: "exchange",
      sourceKey: "exchange",
    });
    db.ApiKeys.belongsTo(db.Users, {
      foreignKey: "email",
      targetKey: "email",
    });
  }
};
