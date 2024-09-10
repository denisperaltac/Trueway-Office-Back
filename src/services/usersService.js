const { Usuario } = require("../db");
const bcrypt = require("bcryptjs");
async function addUserService(user) {
  try {
    const passwordHash = await bcrypt.hash(user.Password, 12);

    const User = {
      name: user.name,
      userName: user.userName,
      password: passwordHash,
    };
    const newUser = await Usuario.create(User);
    return newUser;
  } catch (error) {
    console.error("Error al agregar usuario:", error);
    throw new Error("No se pudo agregar el usuario");
  }
}

module.exports = {
  addUserService,
};
