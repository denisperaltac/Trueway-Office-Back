const {
  addGastoService,
  getGastosService,
  deleteGastoService,
  getGastosByDayService,
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
    await deleteGastoService(req.body.id);
    res.status(200).json("Gasto agregada");
  } catch (e) {
    console.log("Error in addGasto controller" + e);
  }
};

module.exports = {
  addGasto,
  getGastos,
  deleteGasto,
};
