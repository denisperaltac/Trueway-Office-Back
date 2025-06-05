const { Router } = require("express");
const { stadisticByDay } = require("../../controlers/home");

const router = Router();

// Dashboard routes
router.get("/stadisticByDay", stadisticByDay);

module.exports = router;
