const asyncHandler = require("../middleware/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

const {
  createProduct,
  createManyProducts,
  getAllProducts,
  getProductById,
  updateProduct,
  updateManyProducts,
  replaceProduct,
  deleteProduct,
  deleteManyProducts,
  getLowStockProducts,
} = require("../services/productService");

// CREATE ONE

exports.addProduct = asyncHandler(async (req, res) => {
  const result = await createProduct(req.body);

  res.status(201).json(
    new ApiResponse(
      true,
      "Product created successfully",
      result
    )
  );
});

// CREATE MANY

exports.addManyProducts = asyncHandler(async (req, res) => {
  const result = await createManyProducts(req.body);

  res.status(201).json(
    new ApiResponse(
      true,
      "Products created successfully",
      result
    )
  );
});

// GET ALL

exports.fetchProducts = asyncHandler(async (req, res) => {
  const result = await getAllProducts(req.query);

  res.status(200).json(
    new ApiResponse(
      true,
      "Products fetched successfully",
      result
    )
  );
});

// GET BY ID

exports.fetchProductById = asyncHandler(async (req, res) => {
  const result = await getProductById(req.params.id);

  res.status(200).json(
    new ApiResponse(
      true,
      "Product fetched successfully",
      result
    )
  );
});

// UPDATE ONE

exports.editProduct = asyncHandler(async (req, res) => {
  const result = await updateProduct(
    req.params.id,
    req.body
  );

  res.status(200).json(
    new ApiResponse(
      true,
      "Product updated successfully",
      result
    )
  );
});

// UPDATE MANY

exports.editManyProducts = asyncHandler(async (req, res) => {
  const { category, updateData } = req.body;

  const result = await updateManyProducts(
    category,
    updateData
  );

  res.status(200).json(
    new ApiResponse(
      true,
      "Products updated successfully",
      result
    )
  );
});

// REPLACE ONE

exports.replaceEntireProduct = asyncHandler(async (req, res) => {
  const result = await replaceProduct(
    req.params.id,
    req.body
  );

  res.status(200).json(
    new ApiResponse(
      true,
      "Product replaced successfully",
      result
    )
  );
});

// DELETE ONE

exports.removeProduct = asyncHandler(async (req, res) => {
  const result = await deleteProduct(req.params.id);

  res.status(200).json(
    new ApiResponse(
      true,
      "Product deleted successfully",
      result
    )
  );
});

// DELETE MANY

exports.removeManyProducts = asyncHandler(async (req, res) => {
  const { category } = req.body;

  const result = await deleteManyProducts(category);

  res.status(200).json(
    new ApiResponse(
      true,
      "Products deleted successfully",
      result
    )
  );
});

// LOW STOCK

exports.fetchLowStockProducts = asyncHandler(async (req, res) => {
  const limit = Number(req.query.limit) || 10;

  const result = await getLowStockProducts(limit);

  res.status(200).json(
    new ApiResponse(
      true,
      "Low stock products fetched successfully",
      result
    )
  );
});