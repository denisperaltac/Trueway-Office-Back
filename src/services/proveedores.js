const { Proveedor } = require("../db");
const { Op } = require("sequelize");
const Exception = require("../exceptions/exception");

async function getProveedoresService(req) {
  let filters = {
    name: req.query.name,
    dateFrom: req.query.dateFrom || new Date("1900-01-01").toISOString(),
    dateTo: req.query.dateTo || new Date("2200-01-01").toISOString(),
    sort: req.query.sort?.split(","),
  };

  const pagination = {
    size: req.querysize ?? 999,
    page: req.query.page ?? 1,
  };

  try {
    let where = {
      deleted: false,
      createdAt: {
        [Op.between]: [filters.dateFrom, filters.dateTo],
      },
    };

    const offset = (pagination.page - 1) * pagination.size;

    const count = await Proveedor.count({
      where: where,
    });

    const proveedores = await Proveedor.findAll({
      where: where,
      limit: pagination.size,
      offset: offset,
    });

    return { result: proveedores, count };
  } catch (error) {
    console.error(error);
    throw new Exception(500, "Error in get proveedores");
  }
}

async function addProveedorService(Info) {
  try {
    let NuevaProveedor;
    if (Info.proveedorId) {
      NuevaProveedor = await Proveedor.update(
        {
          name: Info.name,
        },
        {
          where: { proveedorId: Info.proveedorId },
        }
      );
    } else {
      NuevaProveedor = await Proveedor.create({
        name: Info.name,
      });
    }

    return NuevaProveedor;
  } catch (error) {
    console.error(error);
    throw new Exception(500, "Error in addProveedorService");
  }
}

module.exports = {
  getProveedoresService,
  addProveedorService,
};
