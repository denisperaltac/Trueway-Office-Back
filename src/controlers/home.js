const { getGastosByDayService } = require("../services/gastos");
const { getIngresosByDayService } = require("../services/ingresos");

const stadisticByDay = async (req, res) => {
  try {
    const gastos = await getGastosByDayService();
    const ingresos = await getIngresosByDayService();

    res.status(200).json({ gastos, ingresos });
  } catch (e) {
    res.status(500).send("Internal Server Error");
    console.log("Error in Gastos by Day controller: " + e);
  }
};

module.exports = {
  stadisticByDay,
};
