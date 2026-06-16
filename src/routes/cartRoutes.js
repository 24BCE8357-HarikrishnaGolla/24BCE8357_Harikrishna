const express =
require("express");

const router =
express.Router();

const authMiddleware =
require("../middleware/authMiddleware");

const {
  addItem,
  fetchCart,
  updateItem,
  removeItem,
  clearUserCart,
  checkout,
} =
require("../controllers/cartController");


router.post(
  "/",
  authMiddleware,
  addItem
);

router.post(
  "/checkout",
  authMiddleware,
  checkout
);

router.get(
  "/",
  authMiddleware,
  fetchCart
);

router.put(
  "/:productId",
  authMiddleware,
  updateItem
);

router.delete(
  "/:productId",
  authMiddleware,
  removeItem
);

router.delete(
  "/clear",
  authMiddleware,
  clearUserCart
);

module.exports =
router;