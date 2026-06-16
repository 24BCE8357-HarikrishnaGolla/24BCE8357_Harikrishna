const asyncHandler = require("../middleware/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

const {
  createCategory,
  createManyCategories,
  getAllCategories,
  getCategoryById,
  updateCategory,
  updateManyCategories,
  replaceCategory,
  deleteCategory,
  deleteManyCategories,
} = require("../services/categoryService");

// CREATE ONE

exports.addCategory = asyncHandler(async (req, res) => {
  const result = await createCategory(req.body);

  res.status(201).json(
    new ApiResponse(
      true,
      "Category created successfully",
      result
    )
  );
});

// CREATE MANY

exports.addManyCategories = asyncHandler(async (req, res) => {
  const result = await createManyCategories(req.body);

  res.status(201).json(
    new ApiResponse(
      true,
      "Categories created successfully",
      result
    )
  );
});

// GET ALL

exports.fetchCategories = asyncHandler(async (req, res) => {
  const result = await getAllCategories(req.query);

  res.status(200).json(
    new ApiResponse(
      true,
      "Categories fetched successfully",
      result
    )
  );
});

// GET BY ID

exports.fetchCategoryById = asyncHandler(async (req, res) => {
  const result = await getCategoryById(req.params.id);

  res.status(200).json(
    new ApiResponse(
      true,
      "Category fetched successfully",
      result
    )
  );
});

// UPDATE ONE

exports.editCategory = asyncHandler(async (req, res) => {
  const result = await updateCategory(
    req.params.id,
    req.body
  );

  res.status(200).json(
    new ApiResponse(
      true,
      "Category updated successfully",
      result
    )
  );
});

// UPDATE MANY

exports.editManyCategories = asyncHandler(async (req, res) => {
  const { name, updateData } = req.body;

  const result = await updateManyCategories(
    name,
    updateData
  );

  res.status(200).json(
    new ApiResponse(
      true,
      "Categories updated successfully",
      result
    )
  );
});

// REPLACE ONE

exports.replaceEntireCategory = asyncHandler(async (req, res) => {
  const result = await replaceCategory(
    req.params.id,
    req.body
  );

  res.status(200).json(
    new ApiResponse(
      true,
      "Category replaced successfully",
      result
    )
  );
});

// DELETE ONE

exports.removeCategory = asyncHandler(async (req, res) => {
  const result = await deleteCategory(req.params.id);

  res.status(200).json(
    new ApiResponse(
      true,
      "Category deleted successfully",
      result
    )
  );
});

// DELETE MANY

exports.removeManyCategories = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const result = await deleteManyCategories(name);

  res.status(200).json(
    new ApiResponse(
      true,
      "Categories deleted successfully",
      result
    )
  );
});