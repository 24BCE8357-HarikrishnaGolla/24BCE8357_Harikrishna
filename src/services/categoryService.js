const getCategoryCollection = require("../models/Category");
const { ObjectId } = require("mongodb");
const ApiError = require("../utils/ApiError");

// CREATE ONE

async function createCategory(categoryData) {
  const categories = getCategoryCollection();

  const existing = await categories.findOne({
    name: categoryData.name.trim(),
  });

  if (existing) {
    throw new ApiError(
      409,
      "Category already exists"
    );
  }

  const newCategory = {
    name: categoryData.name.trim(),
    description: categoryData.description.trim(),
    imageUrl: categoryData.imageUrl || "",
    createdAt: new Date(),
  };

  return await categories.insertOne(newCategory);
}

// CREATE MANY

async function createManyCategories(categoryList) {
  const categories = getCategoryCollection();

  const formatted = categoryList.map((category) => ({
    name: category.name.trim(),
    description: category.description.trim(),
    imageUrl: category.imageUrl || "",
    createdAt: new Date(),
  }));

  return await categories.insertMany(formatted);
}

// GET ALL

async function getAllCategories(query) {

  const categories = getCategoryCollection();

  const filter = {};

  // Search

  if (query.search) {

    filter.name = {

      $regex: query.search,

      $options: "i",

    };

  }

  // Sorting

  const sortField = query.sortBy || "createdAt";

  const sortOrder = query.order === "asc" ? 1 : -1;

  // Pagination

  const page = Number(query.page) || 1;

  const limit = Number(query.limit) || 5;

  const skip = (page - 1) * limit;

  const totalCategories =
    await categories.countDocuments(filter);

  const data = await categories
    .find(filter)
    .sort({
      [sortField]: sortOrder,
    })
    .skip(skip)
    .limit(limit)
    .toArray();

  return {

    page,

    limit,

    totalCategories,

    totalPages: Math.ceil(
      totalCategories / limit
    ),

    data,

  };

}
// GET BY ID

async function getCategoryById(id) {
  const categories = getCategoryCollection();

  const category =
    await categories.findOne({
      _id: new ObjectId(id),
    });

  if (!category) {
    throw new ApiError(
      404,
      "Category not found"
    );
  }

  return category;
}

// UPDATE ONE

async function updateCategory(id, updateData) {
  const categories = getCategoryCollection();

  const result =
    await categories.updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: updateData,
      }
    );

  if (result.matchedCount === 0) {
    throw new ApiError(
      404,
      "Category not found"
    );
  }

  return result;
}

// UPDATE MANY

async function updateManyCategories(
  searchName,
  updateData
) {
  const categories = getCategoryCollection();

  return await categories.updateMany(
    {
      name: searchName,
    },
    {
      $set: updateData,
    }
  );
}

// REPLACE ONE

async function replaceCategory(
  id,
  newData
) {
  const categories = getCategoryCollection();

  const replacement = {
    name: newData.name,
    description: newData.description,
    imageUrl: newData.imageUrl || "",
    createdAt: new Date(),
  };

  const result =
    await categories.replaceOne(
      {
        _id: new ObjectId(id),
      },
      replacement
    );

  if (result.matchedCount === 0) {
    throw new ApiError(
      404,
      "Category not found"
    );
  }

  return result;
}

// DELETE ONE

async function deleteCategory(id) {
  const categories = getCategoryCollection();

  const result =
    await categories.deleteOne({
      _id: new ObjectId(id),
    });

  if (result.deletedCount === 0) {
    throw new ApiError(
      404,
      "Category not found"
    );
  }

  return result;
}

// DELETE MANY

async function deleteManyCategories(
  name
) {
  const categories = getCategoryCollection();

  return await categories.deleteMany({
    name,
  });
}

module.exports = {
  createCategory,
  createManyCategories,
  getAllCategories,
  getCategoryById,
  updateCategory,
  updateManyCategories,
  replaceCategory,
  deleteCategory,
  deleteManyCategories,
};