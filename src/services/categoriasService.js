const { Categoria } = require("../db");
const { Op } = require("sequelize");
const Exception = require("../exceptions/exception");

async function getCategoriasService(req) {
  let filters = {
    Status: req.Status,
    Type: req.Type,
    dateFrom: req.dateFrom || new Date("1900-01-01").toISOString(),
    dateTo: req.dateTo || new Date("2200-01-01").toISOString(),
    sort: req.sort?.split(","),
    multiSearch: req.multiSearch,
  };

  const pagination = {
    size: req.size ?? 10,
    page: req.page ?? 1,
  };

  try {
    let where = {
      deleted: false,
      createdAt: {
        [Op.between]: [filters.dateFrom, filters.dateTo],
      },
    };

    const offset = (pagination.page - 1) * pagination.size;

    const count = await Categoria.count({
      where: where,
    });

    const categorias = await Categoria.findAll({
      where: where,
      limit: pagination.size,
      offset: offset,
    });

    return { result: categorias, count };
  } catch (error) {
    console.error(error);
    throw new Exception(500, "Error in get categorias");
  }
}

async function addCategoriaService(Info) {
  try {
    let NuevaCategoria;
    if (Info.categoriaId) {
      NuevaCategoria = await Categoria.update(
        {
          name: Info.name,
        },
        {
          where: { categoriaId: Info.categoriaId },
        }
      );
    } else {
      NuevaCategoria = await Categoria.create({
        name: Info.name,
      });
    }

    return NuevaCategoria;
  } catch (error) {
    console.error(error);
    throw new Exception(500, "Error in created categoria");
  }
}

module.exports = {
  getCategoriasService,
  addCategoriaService,
};
