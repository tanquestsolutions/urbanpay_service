const Transaction = require("../models/Transaction");

async function getUserTransactions(req, res, next) {
  try {
    const { id } = req.params; // user id
    const transactions = await Transaction.findByUserId(id);

    if (!transactions || transactions.length === 0) {
      return res.status(404).json({ message: "No transactions found" });
    }

    res.json(transactions);
  } catch (err) {
    next(err);
  }
}

module.exports = { getUserTransactions };