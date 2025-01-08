const { DataTypes } = require("sequelize");

const Gasto = (sequelize) => {
  sequelize.define("Gasto", {
    gastoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    monto: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    categoriaId: {
      type: DataTypes.INTEGER,
    },
    proveedorId: {
      type: DataTypes.INTEGER,
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    hora: {
      type: DataTypes.TIME,
    },
    notes: {
      type: DataTypes.TEXT,
    },
    pagado: {
      type: DataTypes.BOOLEAN,
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
};
module.exports = Gasto;
