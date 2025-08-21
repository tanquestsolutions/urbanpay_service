const axios = require("axios");
const { inspayUser, inspayToken } = require("../config/env");

const BASE_URL = "https://www.connect.inspay.in/v3/recharge";

async function doRecharge({ opcode, number, amount, orderid, value1 }) {
  const url = `${BASE_URL}/api?username=${inspayUser}&token=${inspayToken}&opcode=${opcode}&number=${number}&amount=${amount}&orderid=${orderid}&value1=${value1}&format=json`;
  const { data } = await axios.get(url);
  return data;
}

async function checkStatus(orderid) {
  const url = `${BASE_URL}/status?username=${inspayUser}&token=${inspayToken}&orderid=${orderid}&format=json`;
  const { data } = await axios.get(url);
  return data;
}

async function getBalance() {
  const url = `${BASE_URL}/balance?username=${inspayUser}&token=${inspayToken}&format=json`;
  const { data } = await axios.get(url);
  return data;
}

module.exports = { doRecharge, checkStatus, getBalance };
