const { Router } = require("express");
const { getCategorias, addCategoria } = require("../controlers/categoria");
const { login } = require("../controlers/auth");
const { addUser } = require("../controlers/usuario");
const {
  addGasto,
  getGastos,
  deleteGasto,
  getGastosByDay,
} = require("../controlers/gasto");
const {
  addIngreso,
  deleteIngreso,
  getIngresos,
} = require("../controlers/ingreso");
const { getProveedores, addProveedor } = require("../controlers/proveedor");
const { stadisticByDay } = require("../controlers/home");

const router = Router();

// api
router.get("/", (_, res) => res.status(200).send("200"));
router.post("/login", login);

// user
router.post("/addUser", addUser);

// gasto
router.post("/addGasto", addGasto);
router.put("/deleteGasto", deleteGasto);
router.get("/getGastos", getGastos);

// ingreso
router.post("/addIngreso", addIngreso);
router.put("/deleteIngreso", deleteIngreso);
router.get("/getIngresos", getIngresos);

// categoria
router.get("/getCategorias", getCategorias);
router.post("/addCategoria", addCategoria);

// proveedor
router.get("/getProveedores", getProveedores);
router.post("/addProveedor", addProveedor);

// home
router.get("/stadisticByDay", stadisticByDay);

module.exports = router;
