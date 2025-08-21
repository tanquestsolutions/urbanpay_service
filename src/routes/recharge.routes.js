const express = require("express");
const router = express.Router();
const { recharge } = require("../controllers/recharge.controller");

router.post("/do", recharge);

module.exports = router;
