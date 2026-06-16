const { getDB } = require("../config/db");

function getOrderCollection() {
  return getDB().collection("orders");
}

module.exports = getOrderCollection;