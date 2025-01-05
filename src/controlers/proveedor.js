const {
  getProveedoresService,
  addProveedorService,
} = require("../services/proveedores");

const getProveedores = async (req, res) => {
  try {
    const result = await getProveedoresService(req);
    res.status(200).json(result);
  } catch (e) {
    res.status(500).send("Internal Server Error");
    console.log("Error getProveedores controller" + e);
  }
};

const addProveedor = async (req, res) => {
  try {
    await addProveedorService(req.body);
    res.status(200).json("Proveedor agregado");
  } catch (e) {
    console.log("Error in addProveedor controller" + e);
  }
};

module.exports = {
  addProveedor,
  getProveedores,
};
