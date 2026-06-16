const { getDB } = require("../config/db");

function getCartCollection() {
  return getDB().collection("carts");
}

module.exports = getCartCollection;