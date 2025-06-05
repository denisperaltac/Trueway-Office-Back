const { Router } = require("express");
const {
  getCategorias,
  addCategoria,
  updateCategoria,
} = require("../../controlers/categoria");

const router = Router();

// Category routes
router.get("/get", getCategorias);
router.post("/add", addCategoria);
router.put("/update/:id", updateCategoria);

module.exports = router;
