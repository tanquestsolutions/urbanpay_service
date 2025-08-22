const express = require("express");
const rechargeRoutes = require("./routes/recharge.routes");
const userRoutes = require("./routes/user.routes");
const transactionRoutes = require("./routes/transaction.routes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
app.use(express.json());

app.use("/api/recharge", rechargeRoutes);
app.use("/api/users", userRoutes);
app.use("/api", transactionRoutes);

// Error handler must be last
app.use(errorHandler);

module.exports = app;