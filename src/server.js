const app = require('./app');
const { port } = require("../src/config/env");
const cron = require("node-cron");
// const { checkPendingRecharges } = require("./src/jobs/rechargeStatusJob");

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// // Run cronjob every 5 minutes
// cron.schedule("*/5 * * * *", () => {
//   console.log("Running recharge status check...");
//   checkPendingRecharges();
// });
