const { Router } = require("express");
const { stadisticByDay } = require("../../controlers/home");

const router = Router();

// Dashboard routes
router.get("/statistics", stadisticByDay);

module.exports = router;
