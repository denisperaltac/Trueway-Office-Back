const { Router } = require("express");
const { addGasto, getGastos, deleteGasto } = require("../../controlers/gasto");

const router = Router();

// Expense routes
router.post("/add", addGasto);
router.get("/get", getGastos);
router.delete("/delete/:id", deleteGasto);

module.exports = router;
