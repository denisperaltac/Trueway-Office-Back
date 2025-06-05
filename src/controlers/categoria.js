const {
  getCategoriasService,
  addCategoriaService,
  updateCategoriaService,
} = require("../services/categorias");

const getCategorias = async (req, res) => {
  try {
    const result = await getCategoriasService(req);
    res.status(200).json(result);
  } catch (e) {
    res.status(500).send("Internal Server Error");
    console.log("Error in Categoria controller" + e);
  }
};

const addCategoria = async (req, res) => {
  try {
    await addCategoriaService(req.body);
    res.status(200).json("Categoria agregada");
  } catch (e) {
    console.log("Error in addCategoria controller" + e);
    res.status(500).send("Internal Server Error");
  }
};

const updateCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await updateCategoriaService(id, req.body);
    res.status(200).json(result);
  } catch (e) {
    console.log("Error in updateCategoria controller" + e);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getCategorias,
  addCategoria,
  updateCategoria,
};
