const { Router } = require("express");
const { getProveedores, addProveedor } = require("../../controlers/proveedor");

const router = Router();

// Supplier routes
router.get("/get", getProveedores);
router.post("/add", addProveedor);

module.exports = router;
