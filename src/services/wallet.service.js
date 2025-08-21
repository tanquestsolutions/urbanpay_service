const User = require("../models/User");

async function deduct(userId, amount) {
  return await User.deductWallet(userId, amount);
}

async function refund(userId, amount) {
  return await User.refundWallet(userId, amount);
}

module.exports = { deduct, refund };
