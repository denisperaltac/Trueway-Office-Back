const { Area } = require("../db");

const getAllAreas = async (req, res) => {
  try {
    const areas = await Area.findAll({
      where: { deleted: false },
      order: [["name", "ASC"]],
    });
    res.status(200).json(areas);
  } catch (error) {
    console.error("Error getting areas:", error);
    res.status(500).json({ message: "Error getting areas" });
  }
};

const getAreaById = async (req, res) => {
  try {
    const { id } = req.params;
    const area = await Area.findOne({
      where: { areaId: id, deleted: false },
    });
    if (!area) {
      return res.status(404).json({ message: "Area not found" });
    }
    res.status(200).json(area);
  } catch (error) {
    console.error("Error getting area:", error);
    res.status(500).json({ message: "Error getting area" });
  }
};

const createArea = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newArea = await Area.create({
      name,
      description,
    });
    res.status(201).json(newArea);
  } catch (error) {
    console.error("Error creating area:", error);
    res.status(500).json({ message: "Error creating area" });
  }
};

const updateArea = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const area = await Area.findOne({
      where: { areaId: id, deleted: false },
    });
    if (!area) {
      return res.status(404).json({ message: "Area not found" });
    }
    await area.update({
      name,
      description,
    });
    res.status(200).json(area);
  } catch (error) {
    console.error("Error updating area:", error);
    res.status(500).json({ message: "Error updating area" });
  }
};

const deleteArea = async (req, res) => {
  try {
    const { id } = req.params;
    const area = await Area.findOne({
      where: { areaId: id, deleted: false },
    });
    if (!area) {
      return res.status(404).json({ message: "Area not found" });
    }
    await area.update({ deleted: true });
    res.status(200).json({ message: "Area deleted successfully" });
  } catch (error) {
    console.error("Error deleting area:", error);
    res.status(500).json({ message: "Error deleting area" });
  }
};

module.exports = {
  getAllAreas,
  getAreaById,
  createArea,
  updateArea,
  deleteArea,
};
