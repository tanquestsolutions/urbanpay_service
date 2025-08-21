const express = require("express");
const rechargeRoutes = require("./routes/recharge.routes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
app.use(express.json());

app.use("/api", rechargeRoutes);

// Error handler must be last
app.use(errorHandler);

module.exports = app;