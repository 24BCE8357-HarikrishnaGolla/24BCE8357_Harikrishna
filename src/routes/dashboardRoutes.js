const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const {
  dashboardSummary,
  categoryStats,
  topExpensive,
  lowExpensive,
} = require("../controllers/dashboardController");

router.get(
  "/summary",
  authMiddleware,
  adminMiddleware,
  dashboardSummary
);

router.get(
  "/category-stats",
  authMiddleware,
  adminMiddleware,
  categoryStats
);

router.get(
  "/top-expensive",
  authMiddleware,
  adminMiddleware,
  topExpensive
);

router.get(
  "/low-expensive",
  authMiddleware,
  adminMiddleware,
  lowExpensive
);

module.exports = router;