const { addUserService } = require("../services/usersService");

const addUser = async (req, res) => {
  try {
    await addUserService(req.body);
    res.status(200).json("User added");
  } catch (error) {
    console.error("Error al agregar usuario:", error);
    return res
      .status(error.statusCode ? error.statusCode : 500)
      .json({ message: error.message });
  }
};
module.exports = {
  addUser,
};
