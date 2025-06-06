const { DataTypes } = require("sequelize");

const Ingreso = (sequelize) => {
  sequelize.define("Ingreso", {
    ingresoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    monto: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM(
        "Efectivo",
        "Tarjeta crédito",
        "Tarjeta débito",
        "Cuentas Corrientes"
      ),
      allowNull: false,
    },
    areaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    hora: {
      type: DataTypes.TIME,
    },

    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
};

module.exports = Ingreso;
