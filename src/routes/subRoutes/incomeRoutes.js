const { Router } = require("express");
const {
  addIngreso,
  deleteIngreso,
  getIngresos,
} = require("../../controlers/ingreso");

const router = Router();

// Income routes
router.post("/", addIngreso);
router.get("/", getIngresos);
router.delete("/:id", deleteIngreso);

module.exports = router;
