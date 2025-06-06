const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Usuario } = require("../db");

const login = async (req, res) => {
  try {
    const usuario = await Usuario.findOne({
      where: {
        email: req.body.email,
        deleted: false,
      },
    });

    if (!usuario) {
      return res.status(404).json({
        success: false,
        error: "Usuario no encontrado",
      });
    }

    // Verificar si el usuario está activo
    if (!usuario.activo) {
      return res.status(401).json({
        success: false,
        error: "Usuario inactivo",
      });
    }

    // Comparar contraseñas
    const passwordMatch = await bcrypt.compare(
      req.body.password,
      usuario.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        error: "Contraseña incorrecta",
      });
    }

    // Generar token JWT
    const token = jwt.sign(
      {
        id: usuario.userId,
        email: usuario.email,
        rol: usuario.rol,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    // Actualizar último acceso
    await usuario.update({ ultimoAcceso: new Date() });

    // Devolver respuesta exitosa con token
    res.status(200).json({
      success: true,
      result: {
        token,
        usuario: {
          id: usuario.userId,
          nombre: usuario.name,
          email: usuario.email,
          rol: usuario.rol,
        },
      },
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({
      success: false,
      error: "Error en el servidor",
    });
  }
};

module.exports = {
  login,
};
