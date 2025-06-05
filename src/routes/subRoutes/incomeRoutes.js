const { Router } = require("express");
const {
  addIngreso,
  deleteIngreso,
  getIngresos,
} = require("../../controlers/ingreso");

const router = Router();

// Income routes
router.post("/add", addIngreso);
router.get("/get", getIngresos);
router.delete("/delete/:id", deleteIngreso);

module.exports = router;
