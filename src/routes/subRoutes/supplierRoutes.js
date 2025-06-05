const { Router } = require("express");
const { getProveedores, addProveedor } = require("../../controlers/proveedor");

const router = Router();

// Supplier routes
router.get("/", getProveedores);
router.post("/", addProveedor);

module.exports = router;
