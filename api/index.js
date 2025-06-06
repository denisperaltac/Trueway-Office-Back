// api/index.js
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const routes = require("../src/routes/index.js");
const { sequelize } = require("../src/db");

const app = express();

// Configuración del middleware
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));

app.use(morgan("dev"));

// Configuración de CORS
app.use(
  cors({
    origin: process.env.ENVIROMENT === "local" ? "http://localhost:5173" : true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);

// Rutas de la aplicación
app.use("/", routes);

sequelize
  .sync({ force: false })
  .then(() => {
    // El servidor escucha en el puerto 8080
    app.listen(8080, () => {
      if (process.env.ENVIROMENT === "local") {
        console.log("Server on: Listening at http://localhost:8080");
      } else {
        console.log("Server on, production");
      }
    });
  })
  .catch((e) => {
    console.error("Error al sincronizar la base de datos: ", e);
    process.exit(1); // Termina el proceso si hay un error en la base de datos
  });
