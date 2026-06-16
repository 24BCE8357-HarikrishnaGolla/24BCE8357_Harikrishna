const express =
require("express");

const router =
express.Router();

const authMiddleware =
require("../middleware/authMiddleware");

const adminMiddleware =
require("../middleware/adminMiddleware");

const {
  salesSummary,
  ordersByStatus,
  monthlyRevenue
} =
require("../controllers/salesDashboardController");

router.get(
  "/summary",
  authMiddleware,
  adminMiddleware,
  salesSummary
);

router.get(
  "/status",
  authMiddleware,
  adminMiddleware,
  ordersByStatus
);

router.get(
  "/monthly-revenue",
  authMiddleware,
  adminMiddleware,
  monthlyRevenue
);

module.exports = router;