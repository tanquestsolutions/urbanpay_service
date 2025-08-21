const pool = require("../config/db");

const User = {
  // Find user by primary key (id)
  async findById(id) {
    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
    return rows.length > 0 ? rows[0] : null;
  },

  // Update wallet value
  async updateWallet(id, walletAmount) {
    await pool.query(
      "UPDATE users SET wallet = ?, wallet_updated = ? WHERE id = ?",
      [walletAmount, new Date(), id]
    );
  },

  // Deduct wallet balance
  async deductWallet(id, amount) {
    const user = await this.findById(id);
    if (!user) throw new Error("User not found");
    if (user.wallet < amount) throw new Error("Insufficient wallet balance");

    const newBalance = user.wallet - amount;
    await this.updateWallet(id, newBalance);
    return newBalance;
  },

  // Refund wallet balance
  async refundWallet(id, amount) {
    const user = await this.findById(id);
    if (!user) throw new Error("User not found");

    const newBalance = user.wallet + amount;
    await this.updateWallet(id, newBalance);
    return newBalance;
  }
};

module.exports = User;
