const { Usuario } = require("../db");
const bcrypt = require("bcryptjs");

const usuarioService = {
  obtenerUsuarios: async () => {
    try {
      const usuarios = await Usuario.findAll({
        attributes: { exclude: ["password"] },
      });
      return usuarios;
    } catch (error) {
      throw new Error("Error al obtener usuarios: " + error.message);
    }
  },

  obtenerUsuario: async (id) => {
    try {
      const usuario = await Usuario.findByPk(id, {
        attributes: { exclude: ["password"] },
      });
      if (!usuario) {
        throw new Error("Usuario no encontrado");
      }
      return usuario;
    } catch (error) {
      throw new Error("Error al obtener usuario: " + error.message);
    }
  },

  crearUsuario: async (usuarioData) => {
    try {
      // Verificar si el email ya existe
      const usuarioExistente = await Usuario.findOne({
        where: { email: usuarioData.email },
      });

      if (usuarioExistente) {
        throw new Error("El email ya está registrado");
      }

      // Encriptar contraseña
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(usuarioData.password, salt);

      const nuevoUsuario = await Usuario.create({
        ...usuarioData,
        password: hashedPassword,
      });

      // Excluir password del objeto retornado
      const { password, ...usuarioSinPassword } = nuevoUsuario.toJSON();
      return usuarioSinPassword;
    } catch (error) {
      throw new Error("Error al crear usuario: " + error.message);
    }
  },

  actualizarUsuario: async (id, usuarioData) => {
    try {
      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        throw new Error("Usuario no encontrado");
      }

      // Si se está actualizando el email, verificar que no exista
      if (usuarioData.email && usuarioData.email !== usuario.email) {
        const emailExistente = await Usuario.findOne({
          where: { email: usuarioData.email },
        });
        if (emailExistente) {
          throw new Error("El email ya está registrado");
        }
      }

      // Si se está actualizando la contraseña, encriptarla
      if (usuarioData.password) {
        const salt = await bcrypt.genSalt(10);
        usuarioData.password = await bcrypt.hash(usuarioData.password, salt);
      }

      await usuario.update(usuarioData);

      // Excluir password del objeto retornado
      const { password, ...usuarioActualizado } = usuario.toJSON();
      return usuarioActualizado;
    } catch (error) {
      throw new Error("Error al actualizar usuario: " + error.message);
    }
  },

  eliminarUsuario: async (id) => {
    try {
      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        throw new Error("Usuario no encontrado");
      }

      await usuario.destroy();
      return true;
    } catch (error) {
      throw new Error("Error al eliminar usuario: " + error.message);
    }
  },

  actualizarUltimoAcceso: async (id) => {
    try {
      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        throw new Error("Usuario no encontrado");
      }

      await usuario.update({ ultimoAcceso: new Date() });
      return true;
    } catch (error) {
      throw new Error("Error al actualizar último acceso: " + error.message);
    }
  },
};

module.exports = usuarioService;
