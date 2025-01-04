const { Gasto } = require("../db");
const { Op } = require("sequelize");
const Exception = require("../exceptions/exception");

async function getGastosService(req) {
  let filters = {
    categoriaId: req.query?.categoriaId,
    dateFrom: req.query?.dateFrom || new Date("1900-01-01").toISOString(),
    dateTo: req.query?.dateTo || new Date("2200-01-01").toISOString(),
    sort: req.query?.sort?.split(","),
  };
  const pagination = {
    size: req.query?.size ?? 10,
    page: req.query?.page ?? 1,
  };

  try {
    let where = {
      deleted: false,
      createdAt: {
        [Op.between]: [filters.dateFrom, filters.dateTo],
      },
    };

    if (filters.categoriaId) {
      where.categoriaId = filters.categoriaId;
    }

    const offset = (pagination.page - 1) * pagination.size;

    const count = await Gasto.count({
      where: where,
    });

    const Gastos = await Gasto.findAll({
      where: where,
      limit: pagination.size,
      offset: offset,
      order: [["fechaEfectuado", "DESC"]],
    });

    return { result: Gastos, count };
  } catch (error) {
    console.error(error);
    throw new Exception(500, "Error in get Gastos");
  }
}

async function addGastoService(Info) {
  const GastoInfo = {
    name: Info.nombreGasto,
    categoriaId: Info.categoriaGasto,
    monto: Info.montoGasto,
    fechaEfectuado: Info.fechaPago || new Date(),
    pagado: Info.pagado,
  };
  try {
    let NuevoGasto;
    if (Info.gastoId) {
      NuevoGasto = await Gasto.update(GastoInfo, {
        where: { id: Info.id },
      });
    } else {
      NuevoGasto = await Gasto.create(GastoInfo);
    }

    return NuevoGasto;
  } catch (error) {
    console.error(error);
    throw new Exception(500, "Error in created gasto service");
  }
}

async function deleteGastoService(id) {
  try {
    NuevoGasto = await Gasto.update(
      { deleted: true },
      {
        where: { id },
      }
    );

    return { message: "Gasto Eliminado" };
  } catch (error) {
    console.error(error);
    throw new Exception(500, "Error in deleteGastoService");
  }
}

module.exports = {
  getGastosService,
  addGastoService,
  deleteGastoService,
};
