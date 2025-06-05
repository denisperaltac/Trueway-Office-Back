const { Router } = require("express");
const { getCategorias, addCategoria } = require("../../controlers/categoria");

const router = Router();

// Category routes
router.get("/", getCategorias);
router.post("/", addCategoria);

module.exports = router;
