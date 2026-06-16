const {
  getDashboardSummary,
  getCategoryStats,
  getHighestPriceProducts,
  getLowestPriceProducts,
} = require("../services/dashboardService");

const ApiResponse = require("../utils/ApiResponse");

async function dashboardSummary(req, res) {
  const result = await getDashboardSummary();

  res.json(
    new ApiResponse(
      true,
      "Dashboard summary fetched successfully",
      result
    )
  );
}

async function categoryStats(req, res) {
  const result = await getCategoryStats();

  res.json(
    new ApiResponse(
      true,
      "Category statistics fetched successfully",
      result
    )
  );
}

async function topExpensive(req, res) {
  const result = await getHighestPriceProducts();

  res.json(
    new ApiResponse(
      true,
      "Top expensive products fetched",
      result
    )
  );
}

async function lowExpensive(req, res) {
  const result = await getLowestPriceProducts();

  res.json(
    new ApiResponse(
      true,
      "Lowest price products fetched",
      result
    )
  );
}

module.exports = {
  dashboardSummary,
  categoryStats,
  topExpensive,
  lowExpensive,
};