const {
  getCategoriasService,
  addCategoriaService,
} = require("../services/categoriasService");

const getCategorias = async (req, res) => {
  try {
    const result = await getCategoriasService(req.query);
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
  }
};

module.exports = {
  addCategoria,
  getCategorias,
};
