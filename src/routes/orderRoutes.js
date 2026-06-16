const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const validateOrder = require("../middleware/validateOrder");

const {
  addOrder,
  addManyOrders,
  fetchOrders,
  fetchOrderById,
  editOrder,
  editManyOrders,
  replaceEntireOrder,
  removeOrder,
  removeManyOrders,
  fetchMyOrders,
  changeOrderStatus,
  cancelOrderById,
} = require("../controllers/orderController");

// CREATE ONE

router.post(
  "/",
  authMiddleware,
  validateOrder,
  addOrder
);

// CREATE MANY

router.post(
  "/bulk",
  authMiddleware,
  adminMiddleware,
  addManyOrders
);

// GET ALL
router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  fetchOrders
);


// GET BY ID
router.get(
  "/my-orders",
  authMiddleware,
  fetchMyOrders
);
router.get(
  "/:id",
  authMiddleware,
  fetchOrderById
);

// UPDATE ONE

router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  editOrder
);

// UPDATE MANY

router.put(
  "/bulk-update",
  authMiddleware,
  adminMiddleware,
  editManyOrders
);

// REPLACE ONE

router.put(
  "/replace/:id",
  authMiddleware,
  adminMiddleware,
  replaceEntireOrder
);

router.put(
  "/status/:id",
  authMiddleware,
  adminMiddleware,
  changeOrderStatus
);

router.put(
  "/cancel/:id",
  authMiddleware,
  cancelOrderById
);
// DELETE ONE

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  removeOrder
);

// DELETE MANY

router.delete(
  "/bulk-delete",
  authMiddleware,
  adminMiddleware,
  removeManyOrders
);

module.exports = router;