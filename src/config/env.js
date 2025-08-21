require("dotenv").config();

module.exports = {
  port: process.env.PORT || 5000,
  dbUrl: process.env.DB_URL,
  inspayUser: process.env.INSPAY_USER,
  inspayToken: process.env.INSPAY_TOKEN,
};
