const {
  addIngresoService,
  getIngresosService,
  deleteIngresoService,
} = require("../services/ingresosService");

const getIngresos = async (req, res) => {
  try {
    const result = await getIngresosService(req);
    res.status(200).json(result);
  } catch (e) {
    res.status(500).send("Internal Server Error");
    console.log("Error in getIngresos" + e);
  }
};

const addIngreso = async (req, res) => {
  try {
    await addIngresoService(req.body);
    res.status(200).json("Ingreso agregado");
  } catch (e) {
    console.log("Error in addIngreso controller" + e);
  }
};

const deleteIngreso = async (req, res) => {
  try {
    await deleteIngresoService(req.body.id);
    res.status(200).json("Ingreso eliminado");
  } catch (e) {
    console.log("Error in addIngreso controller" + e);
  }
};

module.exports = {
  addIngreso,
  getIngresos,
  deleteIngreso,
};
