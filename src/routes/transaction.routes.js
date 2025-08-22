const express = require("express");
const { getUserTransactions } = require("../controllers/transaction.controller");

const router = express.Router();

// GET /api/users/:id/transactions
router.get("/users/:id/transactions", getUserTransactions);

module.exports = router;