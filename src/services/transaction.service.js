const Transaction = require("../models/Transaction");
const walletService = require("./wallet.service");

/**
 * Create new transaction
 */
async function createTransaction(userId, amount, orderid, inspayResp) {
  let status = 0; // Pending
  if (inspayResp.status === "Success") status = 1;
  if (inspayResp.status === "Failure") status = 2;

  const txn = await Transaction.createTransaction({
    user_id: userId,
    orderid,
    amount,
    status,
    transStatus: 2, // Recharge
    remark: inspayResp.number || "Initiated",
    wallet_deducted: 0,
    real_amount: inspayResp.dr_amount,
    utr: inspayResp.txid,
    opid: inspayResp.opid,
    icon: "/app-assets/icons/recharge.png",
    method: "Electric Bill"
  });

  // ✅ Deduct wallet only if recharge success
  if (status === 1) {
    await walletService.deduct(userId, amount);
    await Transaction.updateTransaction(orderid, { wallet_deducted: 1 });
  }

  return txn;
}

/**
 * Update transaction after status check
 */
async function updateTransaction(orderid, inspayResp) {
  const txn = await Transaction.findTransactionByOrderId(orderid);
  if (!txn) throw new Error("Transaction not found");

  let status = 0;
  if (inspayResp.status === "Success") status = 1;
  if (inspayResp.status === "Failure") status = 2;

  await Transaction.updateTransaction(orderid, {
    status,
    remark: inspayResp.message || txn.remark
  });

  // ✅ Deduct wallet if success & not already deducted
  if (status === 1 && !txn.wallet_deducted) {
    await walletService.deduct(txn.user_id, txn.amount);
    await Transaction.updateTransaction(orderid, { wallet_deducted: 1 });
  }

  // ✅ Refund only if wallet was deducted earlier
  if (status === 2 && txn.wallet_deducted) {
    await walletService.refund(txn.user_id, txn.amount);
    await Transaction.updateTransaction(orderid, { wallet_deducted: 0 });
  }
}

module.exports = { createTransaction, updateTransaction };
