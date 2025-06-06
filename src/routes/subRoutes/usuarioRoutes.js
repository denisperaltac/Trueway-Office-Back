const { Router } = require("express");
const usuarioController = require("../../controlers/usuarioController");
const { esAdmin } = require("../../middleware/auth");

const router = Router();

// Rutas que requieren ser administrador
router.post("/", usuarioController.crearUsuario);
router.put("/:id", esAdmin, usuarioController.actualizarUsuario);
router.delete("/:id", esAdmin, usuarioController.eliminarUsuario);

// Rutas que solo requieren autenticación
router.get("/", usuarioController.obtenerUsuarios);
router.get("/:id", usuarioController.obtenerUsuario);
router.patch("/:id/ultimo-acceso", usuarioController.actualizarUltimoAcceso);

module.exports = router;
