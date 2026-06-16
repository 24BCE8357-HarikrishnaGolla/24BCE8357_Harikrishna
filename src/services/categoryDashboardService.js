const getCategoryCollection =
require("../models/Category");

async function dashboardSummary() {

const categories =
getCategoryCollection();

const totalCategories =
await categories.countDocuments();

return{

totalCategories

};

}

module.exports={

dashboardSummary

};