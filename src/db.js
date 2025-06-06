require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { Sequelize } = require("sequelize");

const sequelize = builSquelize();

function builSquelize() {
  const sslConfig = {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  };

  switch (process.env.NODE_ENV) {
    case "production":
      return new Sequelize(
        process.env.POSTGRES_DATABASE,
        process.env.POSTGRES_USER,
        process.env.POSTGRES_PASSWORD,
        {
          host: process.env.POSTGRES_HOST,
          dialect: "postgres",
          logging: false,
          native: false,
          ...sslConfig,
        }
      );

    default:
      return;
      new Sequelize(
        "postgres://postgres:Messiyyaco@localhost:5432/Caffito Office",
        {
          logging: false,
        }
      );
  }
}

const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

const { Categoria, Gasto, Proveedor, Area, Ingreso, Employee } =
  sequelize.models;

Gasto.belongsTo(Categoria, {
  foreignKey: {
    name: "categoriaId",
    allowNull: false,
  },
  as: "categoria",
});

Categoria.hasMany(Gasto, {
  foreignKey: "categoriaId",
  as: "gastosCat",
});

Gasto.belongsTo(Proveedor, {
  foreignKey: {
    name: "proveedorId",
    allowNull: true,
  },
  as: "proveedor",
});

Proveedor.hasMany(Gasto, {
  foreignKey: "categoriaId",
  as: "gastosProv",
});

Gasto.belongsTo(Area, {
  foreignKey: {
    name: "areaId",
    allowNull: false,
  },
  as: "area",
});

Ingreso.belongsTo(Area, {
  foreignKey: {
    name: "areaId",
    allowNull: false,
  },
  as: "area",
});

Employee.belongsTo(Area, {
  foreignKey: {
    name: "areaId",
    allowNull: false,
  },
  as: "area",
});

Area.hasMany(Employee, {
  foreignKey: "areaId",
  as: "employees",
});

module.exports = {
  ...sequelize.models,
  sequelize,
};
