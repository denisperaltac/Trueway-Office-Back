const { DataTypes } = require("sequelize");

const Categoria = (sequelize) => {
  console.log("Instancia de sequelize:", sequelize);
  sequelize.define("Categoria", {
    categoriaId: {
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

module.exports = Categoria;
