const { Router } = require("express");
const authRoutes = require("./subRoutes/authRoutes");
const expenseRoutes = require("./subRoutes/expenseRoutes");
const incomeRoutes = require("./subRoutes/incomeRoutes");
const categoryRoutes = require("./subRoutes/categoryRoutes");
const supplierRoutes = require("./subRoutes/supplierRoutes");
const employeeRoutes = require("./subRoutes/employeeRoutes");
const dashboardRoutes = require("./subRoutes/dashboardRoutes");
const areaRoutes = require("./subRoutes/areaRoutes");
const usuarioRoutes = require("./subRoutes/usuarioRoutes");
const { verificarToken } = require("../middleware/auth");

const router = Router();

// Health check
router.get("/", (_, res) => res.status(200).send("200"));

// Rutas de autenticación (sin middleware)
router.use("/auth", authRoutes);
router.use("/usuarios", usuarioRoutes);

// Middleware de autenticación para todas las demás rutas
router.use((req, res, next) => {
  // Excluir rutas de autenticación
  if (req.path.startsWith("/auth")) {
    return next();
  }
  verificarToken(req, res, next);
});

// API Routes (protegidas)
router.use("/expenses", expenseRoutes);
router.use("/income", incomeRoutes);
router.use("/categories", categoryRoutes);
router.use("/suppliers", supplierRoutes);
router.use("/employees", employeeRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/areas", areaRoutes);

module.exports = router;
