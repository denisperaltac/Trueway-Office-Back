const { Router } = require("express");
const authRoutes = require("./subRoutes/authRoutes");
const expenseRoutes = require("./subRoutes/expenseRoutes");
const incomeRoutes = require("./subRoutes/incomeRoutes");
const categoryRoutes = require("./subRoutes/categoryRoutes");
const supplierRoutes = require("./subRoutes/supplierRoutes");
const employeeRoutes = require("./subRoutes/employeeRoutes");
const dashboardRoutes = require("./subRoutes/dashboardRoutes");
const areaRoutes = require("./subRoutes/areaRoutes");

const router = Router();

// Health check
router.get("/", (_, res) => res.status(200).send("200"));

// API Routes
router.use("/auth", authRoutes);
router.use("/expenses", expenseRoutes);
router.use("/income", incomeRoutes);
router.use("/categories", categoryRoutes);
router.use("/suppliers", supplierRoutes);
router.use("/employees", employeeRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/areas", areaRoutes);

module.exports = router;
