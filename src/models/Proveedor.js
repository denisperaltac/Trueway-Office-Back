const { DataTypes } = require("sequelize");

const Proveedor = (sequelize) => {
  sequelize.define("Proveedor", {
    proveedorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
};
module.exports = Proveedor;
