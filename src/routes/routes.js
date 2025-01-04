const { Router } = require("express");
const { getCategorias, addCategoria } = require("../controlers/categoria");
const { login } = require("../controlers/auth");
const { addUser } = require("../controlers/usuario");
const { addGasto, getGastos, deleteGasto } = require("../controlers/gasto");
const {
  addIngreso,
  deleteIngreso,
  getIngresos,
} = require("../controlers/ingreso");

const router = Router();

// api
router.get("/", (_, res) => res.status(200).send("200"));
router.post("/login", login);

// user
router.post("/addUser", addUser);

// categoria
router.get("/getCategorias", getCategorias);
router.post("/addCategoria", addCategoria);

// gastos
router.post("/addGasto", addGasto);
router.put("/deleteGasto", deleteGasto);
router.get("/getGastos", getGastos);

// ingresos
router.post("/addIngreso", addIngreso);
router.put("/deleteIngreso", deleteIngreso);
router.get("/getIngresos", getIngresos);

module.exports = router;
