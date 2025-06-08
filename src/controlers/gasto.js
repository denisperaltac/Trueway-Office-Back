const {
  addGastoService,
  getGastosService,
  deleteGastoService,
  getGastosByDayService,
  getGastoByIdService,
} = require("../services/gastos");

const getGastos = async (req, res) => {
  try {
    const result = await getGastosService(req);
    res.status(200).json(result);
  } catch (e) {
    res.status(500).send("Internal Server Error");
    console.log("Error in Gastos controller" + e);
  }
};

const getGastoById = async (req, res) => {
  try {
    const { id } = req.params;
    const gasto = await getGastoByIdService(id);
    res.status(200).json(gasto);
  } catch (e) {
    console.error("Error in getGastoById controller:", e);
    res.status(500).json({ message: "Error al obtener el gasto" });
  }
};

const addGasto = async (req, res) => {
  try {
    await addGastoService(req.body);
    res.status(200).json("Gasto agregada");
  } catch (e) {
    console.log("Error in addGasto controller" + e);
  }
};

const deleteGasto = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteGastoService(id);
    res.status(200).json({ message: "Gasto eliminado correctamente" });
  } catch (e) {
    console.error("Error in deleteGasto controller:", e);
    res.status(500).json({ message: "Error al eliminar el gasto" });
  }
};

module.exports = {
  addGasto,
  getGastos,
  deleteGasto,
  getGastoById,
};
