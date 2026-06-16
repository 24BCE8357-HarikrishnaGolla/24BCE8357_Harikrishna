const { getDB } = require("../config/db");

function getCategoryCollection() {
  return getDB().collection("categories");
}

module.exports = getCategoryCollection;