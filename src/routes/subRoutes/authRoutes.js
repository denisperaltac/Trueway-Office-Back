const { Router } = require("express");
const { login } = require("../../controlers/auth");
const { addUser } = require("../../controlers/usuario");

const router = Router();

// Auth routes
router.post("/login", login);
router.post("/register", addUser);

module.exports = router;
