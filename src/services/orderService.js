const getOrderCollection = require("../models/Order");
const getProductCollection = require("../models/Product");

const { ObjectId } = require("mongodb");

const ApiError = require("../utils/ApiError");


// ---------------- CREATE ONE ----------------

async function createOrder(orderData) {

  const orders = getOrderCollection();

  const productsCollection = getProductCollection();

  let totalAmount = 0;

  const items = [];

  for (const item of orderData.products) {

    const product = await productsCollection.findOne({
      _id: new ObjectId(item.productId),
    });

    if (!product) {
      throw new ApiError(404, "Product not found");
    }

    if (product.stock < item.quantity) {
      throw new ApiError(
        400,
        `${product.name} has insufficient stock`
      );
    }

    totalAmount += product.price * item.quantity;
    await productsCollection.updateOne(
  {
    _id: product._id,
  },
  {
    $inc: {
      stock: -item.quantity,
    },
  }
);

    items.push({
      productId: product._id,
      name: product.name,
      price: product.price,
      quantity: item.quantity,
    });
  }

  const newOrder = {
    userId: new ObjectId(orderData.userId),
    products: items,
    totalAmount,
    status: "Pending",
    createdAt: new Date(),
  };

  const result = await orders.insertOne(newOrder);

  return result;
}


// ---------------- CREATE MANY ----------------

async function createManyOrders(orderList) {

  const orders = getOrderCollection();

  const formattedOrders = orderList.map((order) => ({
    userId: new ObjectId(order.userId),
    products: order.products,
    totalAmount: order.totalAmount,
    status: "Pending",
    createdAt: new Date(),
  }));

  return await orders.insertMany(formattedOrders);

}


// ---------------- GET ALL ----------------

async function getAllOrders(query) {

  const orders = getOrderCollection();

  const filter = {};

  if (query.search) {
    filter.status = {
      $regex: query.search,
      $options: "i",
    };
  }

  const sortField = query.sortBy || "createdAt";

  const sortOrder =
    query.order === "asc" ? 1 : -1;

  const page = Number(query.page) || 1;

  const limit = Number(query.limit) || 5;

  const skip = (page - 1) * limit;

  const totalOrders =
    await orders.countDocuments(filter);

  const data = await orders
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

    totalOrders,

    totalPages:
      Math.ceil(totalOrders / limit),

    data,

  };

}


// ---------------- GET BY ID ----------------

async function getOrderById(id) {

  const orders = getOrderCollection();

  const order = await orders.findOne({

    _id: new ObjectId(id),

  });

  if (!order) {

    throw new ApiError(

      404,

      "Order not found"

    );

  }

  return order;

}


// ---------------- UPDATE ONE ----------------

async function updateOrder(id, updateData) {

  const orders = getOrderCollection();

  const result =
    await orders.updateOne(

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

      "Order not found"

    );

  }

  return result;

}


// ---------------- UPDATE MANY ----------------

async function updateManyOrders(
  status,
  updateData
) {

  const orders = getOrderCollection();

  return await orders.updateMany(

    {

      status,

    },

    {

      $set: updateData,

    }

  );

}


// ---------------- REPLACE ----------------

async function replaceOrder(id, newData) {

  const orders = getOrderCollection();

  const replacement = {

    userId: new ObjectId(newData.userId),

    products: newData.products,

    totalAmount: newData.totalAmount,

    status: newData.status,

    createdAt: new Date(),

  };

  const result =
    await orders.replaceOne(

      {

        _id: new ObjectId(id),

      },

      replacement

    );

  if (result.matchedCount === 0) {

    throw new ApiError(

      404,

      "Order not found"

    );

  }

  return result;

}


// ---------------- DELETE ONE ----------------

async function deleteOrder(id) {

  const orders = getOrderCollection();

  const result =
    await orders.deleteOne({

      _id: new ObjectId(id),

    });

  if (result.deletedCount === 0) {

    throw new ApiError(

      404,

      "Order not found"

    );

  }

  return result;

}


// ---------------- DELETE MANY ----------------

async function deleteManyOrders(status) {

  const orders = getOrderCollection();

  return await orders.deleteMany({

    status,

  });

//   Get Order

}
async function getOrdersByUser(userId) {
  const orders = getOrderCollection();

  return await orders
    .find({
      userId: new ObjectId(userId),
    })
    .sort({
      createdAt: -1,
    })
    .toArray();
}
//     UPDATE THE ORDER STATUS
async function updateOrderStatus(
  id,
  status
) {

  const orders =
    getOrderCollection();

  const result =
    await orders.updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: {
          status,
        },
      }
    );

  if (result.matchedCount === 0) {
    throw new ApiError(
      404,
      "Order not found"
    );
  }

  return result;
}

async function cancelOrder(id) {

  const orders =
    getOrderCollection();

  const productsCollection =
    getProductCollection();

  const order =
    await orders.findOne({
      _id: new ObjectId(id),
    });

  if (!order) {
    throw new ApiError(
      404,
      "Order not found"
    );
  }

  if (order.status === "Cancelled") {
    throw new ApiError(
      400,
      "Order already cancelled"
    );
  }

  for (const item of order.products) {

    await productsCollection.updateOne(
      {
        _id: item.productId,
      },
      {
        $inc: {
          stock: item.quantity,
        },
      }
    );

  }

  await orders.updateOne(
    {
      _id: order._id,
    },
    {
      $set: {
        status: "Cancelled",
      },
    }
  );

  return {
    message:
      "Order cancelled successfully",
  };
}


module.exports = {

  createOrder,

  createManyOrders,

  getAllOrders,

  getOrderById,

  updateOrder,

  updateManyOrders,

  replaceOrder,

  deleteOrder,

  deleteManyOrders,

  getOrdersByUser,

  updateOrderStatus,

  cancelOrder,

};