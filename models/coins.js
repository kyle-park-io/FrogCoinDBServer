const Sequelize = require("sequelize");

module.exports = class Coins extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        // no: {
        //   type: Sequelize.INTEGER,
        //   autoIncrement: true,
        //   allowNull: false,
        //   primaryKey: true,
        // },
        id: {
          primaryKey: true,
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        symbol: {
          allowNull: false,
          type: Sequelize.STRING(45),
        },
      },
      {
        sequelize,
        timestamps: false,
        modelName: "Coins",
        tableName: "coins",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
  }
};
