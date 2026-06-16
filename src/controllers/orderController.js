const asyncHandler = require("../middleware/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

const {
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

} = require("../services/orderService");

// CREATE ONE

exports.addOrder = asyncHandler(async (req, res) => {

  const result = await createOrder(req.body);

  res.status(201).json(
    new ApiResponse(
      true,
      "Order created successfully",
      result
    )
  );

});
// CREATE MANY

exports.addManyOrders = asyncHandler(async (req, res) => {
  const result = await createManyOrders(req.body);

  res.status(201).json(
    new ApiResponse(
      true,
      "Orders created successfully",
      result
    )
  );
});

// GET ALL

exports.fetchOrders = asyncHandler(async (req, res) => {
  const result = await getAllOrders(req.query);

  res.status(200).json(
    new ApiResponse(
      true,
      "Orders fetched successfully",
      result
    )
  );
});

// GET BY ID

exports.fetchOrderById = asyncHandler(async (req, res) => {
  const result = await getOrderById(req.params.id);

  res.status(200).json(
    new ApiResponse(
      true,
      "Order fetched successfully",
      result
    )
  );
});

// UPDATE ONE

exports.editOrder = asyncHandler(async (req, res) => {
  const result = await updateOrder(
    req.params.id,
    req.body
  );

  res.status(200).json(
    new ApiResponse(
      true,
      "Order updated successfully",
      result
    )
  );
});

// UPDATE MANY

exports.editManyOrders = asyncHandler(async (req, res) => {
  const { status, updateData } = req.body;

  const result = await updateManyOrders(
    status,
    updateData
  );

  res.status(200).json(
    new ApiResponse(
      true,
      "Orders updated successfully",
      result
    )
  );
});

// REPLACE ONE

exports.replaceEntireOrder = asyncHandler(async (req, res) => {
  const result = await replaceOrder(
    req.params.id,
    req.body
  );

  res.status(200).json(
    new ApiResponse(
      true,
      "Order replaced successfully",
      result
    )
  );
});

// DELETE ONE

exports.removeOrder = asyncHandler(async (req, res) => {
  const result = await deleteOrder(req.params.id);

  res.status(200).json(
    new ApiResponse(
      true,
      "Order deleted successfully",
      result
    )
  );
});

// DELETE MANY

exports.removeManyOrders = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const result = await deleteManyOrders(status);

  res.status(200).json(
    new ApiResponse(
      true,
      "Orders deleted successfully",
      result
    )
  );
});
exports.fetchMyOrders =
  asyncHandler(async (req, res) => {

    const result =
      await getOrdersByUser(req.user.id);

    res.status(200).json(
      new ApiResponse(
        true,
        "My orders fetched successfully",
        result
      )
    );

  });

  exports.changeOrderStatus =
  asyncHandler(async (req, res) => {

    const result =
      await updateOrderStatus(
        req.params.id,
        req.body.status
      );

    res.status(200).json(
      new ApiResponse(
        true,
        "Order status updated",
        result
      )
    );

  });

// cancel order

exports.cancelOrderById =
  asyncHandler(async (req, res) => {

    const result =
      await cancelOrder(
        req.params.id
      );

    res.status(200).json(
      new ApiResponse(
        true,
        result.message,
        null
      )
    );

  });