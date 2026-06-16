const getProductCollection = require("../models/Product");

async function getDashboardSummary() {
  const products = getProductCollection();

  // Total Products
  const totalProducts = await products.countDocuments();

  // Total Inventory Value
  const inventoryValue = await products.aggregate([
    {
      $project: {
        total: {
          $multiply: ["$price", "$stock"]
        }
      }
    },
    {
      $group: {
        _id: null,
        totalInventoryValue: {
          $sum: "$total"
        }
      }
    }
  ]).toArray();

  // Average Price
  const averagePrice = await products.aggregate([
    {
      $group: {
        _id: null,
        averagePrice: {
          $avg: "$price"
        }
      }
    }
  ]).toArray();

  // Total Stock
  const totalStock = await products.aggregate([
    {
      $group: {
        _id: null,
        totalStock: {
          $sum: "$stock"
        }
      }
    }
  ]).toArray();

  return {
    totalProducts,

    inventoryValue:
      inventoryValue[0]?.totalInventoryValue || 0,

    averagePrice:
      averagePrice[0]?.averagePrice || 0,

    totalStock:
      totalStock[0]?.totalStock || 0,
  };
}

async function getCategoryStats() {
  const products = getProductCollection();

  return await products.aggregate([
    {
      $group: {
        _id: "$category",
        totalProducts: {
          $sum: 1
        },
        totalStock: {
          $sum: "$stock"
        }
      }
    },
    {
      $sort: {
        totalProducts: -1
      }
    }
  ]).toArray();
}

async function getHighestPriceProducts() {
  const products = getProductCollection();

  return await products.aggregate([
    {
      $sort: {
        price: -1
      }
    },
    {
      $limit: 5
    }
  ]).toArray();
}

async function getLowestPriceProducts() {
  const products = getProductCollection();

  return await products.aggregate([
    {
      $sort: {
        price: 1
      }
    },
    {
      $limit: 5
    }
  ]).toArray();
}

module.exports = {
  getDashboardSummary,
  getCategoryStats,
  getHighestPriceProducts,
  getLowestPriceProducts,
};