const getOrderCollection = require("../models/Order");

async function getSalesSummary() {

  const orders = getOrderCollection();

  const result = await orders.aggregate([
    {
      $match: {
        status: {
          $ne: "Cancelled"
        }
      }
    },
    {
      $group: {
        _id: null,

        totalOrders: {
          $sum: 1
        },

        totalRevenue: {
          $sum: "$totalAmount"
        },

        averageOrderValue: {
          $avg: "$totalAmount"
        },

        highestOrder: {
          $max: "$totalAmount"
        },

        lowestOrder: {
          $min: "$totalAmount"
        }
      }
    }
  ]).toArray();

  return result[0] || {
    totalOrders: 0,
    totalRevenue: 0,
    averageOrderValue: 0,
    highestOrder: 0,
    lowestOrder: 0
  };
}

async function getOrdersByStatus() {

  const orders = getOrderCollection();

  return await orders.aggregate([
    {
      $group: {
        _id: "$status",
        count: {
          $sum: 1
        }
      }
    }
  ]).toArray();
}

async function getMonthlyRevenue() {

  const orders = getOrderCollection();

  return await orders.aggregate([
    {
      $group: {
        _id: {
          month: {
            $month: "$createdAt"
          }
        },
        revenue: {
          $sum: "$totalAmount"
        }
      }
    },
    {
      $sort: {
        "_id.month": 1
      }
    }
  ]).toArray();
}

module.exports = {
  getSalesSummary,
  getOrdersByStatus,
  getMonthlyRevenue
};