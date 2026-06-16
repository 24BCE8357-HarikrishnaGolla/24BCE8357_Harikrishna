const getProductCollection = require("../models/Product");
const getCategoryCollection = require("../models/Category");
const { ObjectId } = require("mongodb");

// ======================
// CREATE ONE
// ======================

async function createProduct(productData) {
  const products = getProductCollection();
  const categories = getCategoryCollection();

  // Optional category validation
  if (productData.categoryId) {
    const category = await categories.findOne({
      _id: new ObjectId(productData.categoryId),
    });

    if (!category) {
      throw new Error("Category not found");
    }
  }

  const newProduct = {
    name: productData.name.trim(),
    description: productData.description.trim(),
    category: productData.category.trim(),
    price: Number(productData.price),
    stock: Number(productData.stock),
    imageUrl: productData.imageUrl || "",
    createdAt: new Date(),
  };

  return await products.insertOne(newProduct);
}

// ======================
// CREATE MANY
// ======================

async function createManyProducts(productList) {
  const products = getProductCollection();

  const formattedProducts = productList.map((product) => ({
    name: product.name.trim(),
    description: product.description.trim(),
    category: product.category.trim(),
    price: Number(product.price),
    stock: Number(product.stock),
    imageUrl: product.imageUrl || "",
    createdAt: new Date(),
  }));

  return await products.insertMany(formattedProducts);
}

// ======================
// GET ALL
// ======================

async function getAllProducts(query) {
  const products = getProductCollection();

  const filter = {};

  if (query.category) {
    filter.category = query.category;
  }

  if (query.search) {
    filter.name = {
      $regex: query.search,
      $options: "i",
    };
  }

  const sortField = query.sortBy || "createdAt";
  const sortOrder = query.order === "asc" ? 1 : -1;

  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 5;

  const skip = (page - 1) * limit;

  const totalProducts = await products.countDocuments(filter);

  const data = await products
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
    totalProducts,
    totalPages: Math.ceil(totalProducts / limit),
    data,
  };
}

// ======================
// GET BY ID
// ======================

async function getProductById(id) {
  const products = getProductCollection();

  return await products.findOne({
    _id: new ObjectId(id),
  });
}

// ======================
// UPDATE ONE
// ======================

async function updateProduct(id, updateData) {
  const products = getProductCollection();

  await products.updateOne(
    {
      _id: new ObjectId(id),
    },
    {
      $set: updateData,
    }
  );

  return await products.findOne({
    _id: new ObjectId(id),
  });
}

// ======================
// UPDATE MANY
// ======================

async function updateManyProducts(category, updateData) {
  const products = getProductCollection();

  return await products.updateMany(
    {
      category,
    },
    {
      $set: updateData,
    }
  );
}

// ======================
// REPLACE ONE
// ======================

async function replaceProduct(id, productData) {
  const products = getProductCollection();

  const newProduct = {
    name: productData.name,
    description: productData.description,
    category: productData.category,
    price: Number(productData.price),
    stock: Number(productData.stock),
    imageUrl: productData.imageUrl || "",
    createdAt: new Date(),
  };

  await products.replaceOne(
    {
      _id: new ObjectId(id),
    },
    newProduct
  );

  return await products.findOne({
    _id: new ObjectId(id),
  });
}

// ======================
// DELETE ONE
// ======================

async function deleteProduct(id) {
  const products = getProductCollection();

  return await products.deleteOne({
    _id: new ObjectId(id),
  });
}

// ======================
// DELETE MANY
// ======================

async function deleteManyProducts(category) {
  const products = getProductCollection();

  return await products.deleteMany({
    category,
  });
}

// ======================
// LOW STOCK
// ======================

async function getLowStockProducts(limit = 10) {
  const products = getProductCollection();

  return await products
    .find({
      stock: {
        $lt: limit,
      },
    })
    .sort({
      stock: 1,
    })
    .toArray();
}

// ======================
// EXPORTS
// ======================

module.exports = {
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
};