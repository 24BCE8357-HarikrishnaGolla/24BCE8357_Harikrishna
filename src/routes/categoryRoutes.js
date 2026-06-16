const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const validateCategory = require("../middleware/validateCategory");

const {
  addCategory,
  addManyCategories,
  fetchCategories,
  fetchCategoryById,
  editCategory,
  editManyCategories,
  replaceEntireCategory,
  removeCategory,
  removeManyCategories,
} = require("../controllers/categoryController");

// CREATE ONE

router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  validateCategory,
  addCategory
);

// CREATE MANY

router.post(
  "/bulk",
  authMiddleware,
  adminMiddleware,
  addManyCategories
);

// GET ALL

router.get(
  "/",
  authMiddleware,
  fetchCategories
);

// GET BY ID

router.get(
  "/:id",
  authMiddleware,
  fetchCategoryById
);

// UPDATE ONE

router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  editCategory
);

// UPDATE MANY

router.put(
  "/bulk-update",
  authMiddleware,
  adminMiddleware,
  editManyCategories
);

// REPLACE ONE

router.put(
  "/replace/:id",
  authMiddleware,
  adminMiddleware,
  replaceEntireCategory
);

// DELETE ONE

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  removeCategory
);

// DELETE MANY

router.delete(
  "/bulk-delete",
  authMiddleware,
  adminMiddleware,
  removeManyCategories
);

module.exports = router;