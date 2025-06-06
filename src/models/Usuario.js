const { DataTypes } = require("sequelize");

const Usuario = (sequelize) => {
  sequelize.define("Usuario", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    rol: {
      type: DataTypes.ENUM("admin", "usuario"),
      defaultValue: "usuario",
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
};
module.exports = Usuario;
