// api/index.js
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("../src/routes/routes.js");
const { sequelize } = require("../src/db");

const app = express();

// Configuración del middleware
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));

app.use(morgan("dev"));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

// Rutas de la aplicación
app.use("/", routes);

app.listen(8080, () => {
  console.log("Server on: Listening at http://localhost:8080");
});
// // Sincronización de la base de datos y arranque del servidor
// sequelize
//   .sync({ force: false })
//   .then(() => {
//     // El servidor escucha en el puerto 8080
//     app.listen(8080, () => {
//       console.log("Server on: Listening at http://localhost:8080");
//     });
//   })
//   .catch((e) => {
//     console.error("Error al sincronizar la base de datos: ", e);
//     process.exit(1); // Termina el proceso si hay un error en la base de datos
//   });
