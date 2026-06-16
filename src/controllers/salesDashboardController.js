const asyncHandler =
require("../middleware/asyncHandler");

const ApiResponse =
require("../utils/ApiResponse");

const {
  getSalesSummary,
  getOrdersByStatus,
  getMonthlyRevenue
} = require("../services/salesDashboardService");

exports.salesSummary =
asyncHandler(async (req, res) => {

  const result =
    await getSalesSummary();

  res.status(200).json(
    new ApiResponse(
      true,
      "Sales Summary",
      result
    )
  );

});

exports.ordersByStatus =
asyncHandler(async (req, res) => {

  const result =
    await getOrdersByStatus();

  res.status(200).json(
    new ApiResponse(
      true,
      "Orders By Status",
      result
    )
  );

});

exports.monthlyRevenue =
asyncHandler(async (req, res) => {

  const result =
    await getMonthlyRevenue();

  res.status(200).json(
    new ApiResponse(
      true,
      "Monthly Revenue",
      result
    )
  );

});