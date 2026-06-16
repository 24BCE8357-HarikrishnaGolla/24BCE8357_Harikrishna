const { getDB } = require("../config/db");

function getProductCollection() {
  return getDB().collection("products");
}

module.exports = getProductCollection;