const express = require("express");

const router = express.Router();

const {
  addProduct,
  addManyProducts,
  fetchProducts,
  fetchProductById,
  editProduct,
  editManyProducts,
  replaceEntireProduct,
  removeProduct,
  removeManyProducts,
  fetchLowStockProducts,
} = require("../controllers/productController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const validateProduct = require("../middleware/validateProduct");
// Get all products
router.get(
  "/",
  authMiddleware,
  fetchProducts
);
router.get(
  "/:id",
  authMiddleware,
  fetchProductById
);
router.get(

"/low-stock",

authMiddleware,

fetchLowStockProducts

);

// Create single product
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  validateProduct,
  addProduct
);

// Create multiple products
router.post(
  "/bulk",
  authMiddleware,
  adminMiddleware,
  addManyProducts
);
router.put(
  "/bulk-update",
  authMiddleware,
  adminMiddleware,
  editManyProducts
);

router.put(
  "/replace/:id",
  authMiddleware,
  adminMiddleware,
  replaceEntireProduct
);

router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  editProduct
);
// delete products
router.delete(
  "/bulk-delete",
  authMiddleware,
  adminMiddleware,
  removeManyProducts
);

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  removeProduct
);

module.exports = router;