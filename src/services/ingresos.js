const { Ingreso } = require("../db");
const { Op } = require("sequelize");
const Exception = require("../exceptions/exception");
const { Sequelize } = require("sequelize");

async function getIngresosService(req) {
  let filters = {
    type: req.query?.type,
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
      fecha: {
        [Op.between]: [filters.dateFrom, filters.dateTo],
      },
    };

    if (filters.type) {
      where.type = filters.type;
    }

    const offset = (pagination.page - 1) * pagination.size;

    const count = await Ingreso.count({
      where: where,
    });

    const Ingresos = await Ingreso.findAll({
      where: where,
      limit: pagination.size,
      offset: offset,
      order: [["fecha", "DESC"]],
    });

    return { result: Ingresos, count };
  } catch (error) {
    console.error(error);
    throw new Exception(500, "Error in getIngresosService");
  }
}

async function addIngresoService(Info) {
  const IngresoInfo = {
    type: Info.type,
    monto: Info.monto,
    fecha: Info.fecha || new Date(),
    hora: Info.hora,
  };
  try {
    let NuevoIngreso;
    if (Info.ingresoId) {
      NuevoIngreso = await Ingreso.update(IngresoInfo, {
        where: { id: Info.id },
      });
    } else {
      NuevoIngreso = await Ingreso.create(IngresoInfo);
    }

    return NuevoIngreso;
  } catch (error) {
    console.error(error);
    throw new Exception(500, "Error in created ingreso service");
  }
}

async function deleteIngresoService(id) {
  try {
    NuevoIngreso = await Ingreso.update(
      { deleted: true },
      {
        where: { id },
      }
    );

    return { message: "Ingreso Eliminado" };
  } catch (error) {
    console.error(error);
    throw new Exception(500, "Error in deleteIngresoService");
  }
}

async function getIngresosByDayService() {
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const endOfMonth = new Date(startOfMonth);
  endOfMonth.setMonth(endOfMonth.getMonth() + 1);

  const ingresosByDay = await Ingreso.findAll({
    attributes: [
      [
        Sequelize.literal(`DATE_TRUNC('day', "fecha" AT TIME ZONE 'GMT-3')`),
        "day",
      ],
      [Sequelize.fn("SUM", Sequelize.col("monto")), "amount"],
      [Sequelize.literal(`MIN("fecha")`), "another"], // Para verificar la fecha real
    ],
    where: {
      fecha: {
        [Op.gte]: startOfMonth,
        [Op.lt]: endOfMonth,
      },
      deleted: false,
    },
    group: [
      Sequelize.literal(`DATE_TRUNC('day', "fecha" AT TIME ZONE 'GMT-3')`),
    ],
    order: [
      [
        Sequelize.literal(`DATE_TRUNC('day', "fecha" AT TIME ZONE 'GMT-3')`),
        "ASC",
      ],
    ],
    raw: true,
  });

  return ingresosByDay.map((item) => ({
    day: new Date(item.day).getDate(),
    amount: parseFloat(item.amount),
  }));
}

module.exports = {
  getIngresosService,
  addIngresoService,
  deleteIngresoService,
  getIngresosByDayService,
};
