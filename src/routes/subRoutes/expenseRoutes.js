const { Router } = require("express");
const { addGasto, getGastos, deleteGasto } = require("../../controlers/gasto");

const router = Router();

// Expense routes
router.post("/", addGasto);
router.get("/", getGastos);
router.delete("/:id", deleteGasto);

module.exports = router;
