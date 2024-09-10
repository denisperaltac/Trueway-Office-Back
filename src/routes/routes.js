const { Router } = require("express");
const { getCategorias, addCategoria } = require("../controlers/categoria");
const { login } = require("../controlers/auth");
const { addUser } = require("../controlers/usuario");
const { addGasto, getGastos } = require("../controlers/gasto");

const router = Router();

router.get("/", (req, res) => res.status(200).send("200"));
router.get("/getCategoria", getCategorias);
router.post("/addCategoria", addCategoria);
router.post("/login", login);
router.post("/addUser", addUser);
router.post("/addGasto", addGasto);
router.get("/getGastos", getGastos);

module.exports = router;
