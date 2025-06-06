const { Router } = require("express");
const {
  getAllAreas,
  getAreaById,
  createArea,
  updateArea,
  deleteArea,
} = require("../../controlers/area");

const router = Router();

// Area routes
router.get("/get", getAllAreas);
router.get("/get/:id", getAreaById);
router.post("/add", createArea);
router.put("/update/:id", updateArea);
router.delete("/delete/:id", deleteArea);

module.exports = router;
