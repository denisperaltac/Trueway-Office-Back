const { Router } = require("express");
const {
  addGasto,
  getGastos,
  deleteGasto,
  getGastoById,
} = require("../../controlers/gasto");

const router = Router();

// Expense routes
router.post("/add", addGasto);
router.get("/get", getGastos);
router.get("/get/:id", getGastoById);
router.delete("/delete/:id", deleteGasto);

module.exports = router;
