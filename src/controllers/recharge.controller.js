const { doRecharge } = require("../services/inspay.service");
const { createTransaction } = require("../services/transaction.service");

async function recharge(req, res, next) {
  try {
    const { userId, opcode, number, amount, value1 } = req.body;
    const orderid = Date.now().toString();

    console.log(value1);
    
    const response = await doRecharge({ opcode, number, amount, orderid, value1 });
    // create transaction record
    await createTransaction(userId, amount, orderid, response);

    res.json(response);
  } catch (err) {
    next(err);
  }
}

module.exports = { recharge };
