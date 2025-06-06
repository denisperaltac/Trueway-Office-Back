const usuarioService = require("../services/usuarioService");

const usuarioController = {
  obtenerUsuarios: async (req, res) => {
    try {
      const usuarios = await usuarioService.obtenerUsuarios();
      res.json({
        success: true,
        result: usuarios,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  },

  obtenerUsuario: async (req, res) => {
    try {
      const { id } = req.params;
      const usuario = await usuarioService.obtenerUsuario(id);
      res.json({
        success: true,
        result: usuario,
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        error: error.message,
      });
    }
  },

  crearUsuario: async (req, res) => {
    try {
      const usuarioData = req.body;
      const nuevoUsuario = await usuarioService.crearUsuario(usuarioData);
      res.status(201).json({
        success: true,
        result: nuevoUsuario,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  },

  actualizarUsuario: async (req, res) => {
    try {
      const { id } = req.params;
      const usuarioData = req.body;
      const usuarioActualizado = await usuarioService.actualizarUsuario(
        id,
        usuarioData
      );
      res.json({
        success: true,
        result: usuarioActualizado,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  },

  eliminarUsuario: async (req, res) => {
    try {
      const { id } = req.params;
      await usuarioService.eliminarUsuario(id);
      res.json({
        success: true,
        message: "Usuario eliminado correctamente",
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  },

  actualizarUltimoAcceso: async (req, res) => {
    try {
      const { id } = req.params;
      await usuarioService.actualizarUltimoAcceso(id);
      res.json({
        success: true,
        message: "Último acceso actualizado correctamente",
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  },
};

module.exports = usuarioController;
