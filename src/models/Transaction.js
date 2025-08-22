const db = require("../config/db"); // mysql2 pool

async function createTransaction(data) {
  const [result] = await db.query(
    `INSERT INTO transactions 
    (user_id, orderid, amount, status, transStatus, remark, wallet_deducted, created_at, updated_at, real_amount, utr, opid, icon, method) 
    VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW(), ?, ?, ?, ?, ?)`,
    [
      data.user_id,
      data.orderid,
      data.amount,
      data.status,
      data.transStatus,
      data.remark,
      data.wallet_deducted ? 1 : 0,
      data.real_amount,
      data.utr,
      data.opid,
      data.icon,
      data.method
    ]
  );
  return { id: result.insertId, ...data };
}

async function findTransactionByOrderId(orderid) {
  const [rows] = await db.query(
    `SELECT * FROM transactions WHERE orderid = ? LIMIT 1`,
    [orderid]
  );
  return rows[0];
}


async function findByUserId(userId) {
  const [rows] = await db.query(
    `SELECT * FROM transactions WHERE user_id = ? ORDER BY created_at DESC`,
    [userId]
  );
  return rows;
}

async function updateTransaction(orderid, updates) {
  const fields = [];
  const values = [];
  for (let key in updates) {
    fields.push(`${key} = ?`);
    values.push(updates[key]);
  }
  values.push(orderid);

  await db.query(
    `UPDATE transactions SET ${fields.join(", ")}, updated_at = NOW() WHERE orderid = ?`,
    values
  );
}

module.exports = {
  createTransaction,
  findTransactionByOrderId,
  updateTransaction,
  findByUserId,
};
