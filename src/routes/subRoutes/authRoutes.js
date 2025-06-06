const { Router } = require("express");
const { login } = require("../../controlers/auth");

const router = Router();

// Auth routes
router.post("/login", login);

module.exports = router;
