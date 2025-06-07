const jwt = require("jsonwebtoken");
const { Usuario } = require("../db");

const verificarToken = async (req, res, next) => {
  try {
    // Obtener el token del header
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        error: "No se proporcionó un token de autenticación",
      });
    }

    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Buscar el usuario en la base de datos
    const usuario = await Usuario.findByPk(decoded.id, {
      attributes: { exclude: ["password"] },
    });

    if (!usuario) {
      return res.status(401).json({
        success: false,
        error: "Usuario no encontrado",
      });
    }

    if (!usuario.activo) {
      return res.status(401).json({
        success: false,
        error: "Usuario inactivo",
      });
    }

    // Agregar el usuario al request
    req.usuario = usuario;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        error: "Token inválido",
      });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        error: "Token expirado",
      });
    }
    return res.status(500).json({
      success: false,
      error: "Error en la autenticación",
    });
  }
};

const esAdmin = (req, res, next) => {
  if (req.usuario.rol !== "admin") {
    return res.status(403).json({
      success: false,
      error: "Se requieren privilegios de administrador",
    });
  }
  next();
};

module.exports = {
  verificarToken,
  esAdmin,
};
