const asyncHandler =
require("../middleware/asyncHandler");

const ApiResponse =
require("../utils/ApiResponse");

const {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
  clearCart,
  checkoutCart,
} =
require("../services/cartService");


exports.addItem =
asyncHandler(async(req,res)=>{

const result =
await addToCart(
req.user.id,
req.body.productId,
req.body.quantity
);

res.status(201).json(
new ApiResponse(
true,
"Product added to cart",
result
)
);

});


exports.fetchCart =
asyncHandler(async(req,res)=>{

const result =
await getCart(
req.user.id
);

res.status(200).json(
new ApiResponse(
true,
"Cart fetched successfully",
result
)
);

});


exports.updateItem =
asyncHandler(async(req,res)=>{

const result =
await updateCartItem(
req.user.id,
req.params.productId,
req.body.quantity
);

res.status(200).json(
new ApiResponse(
true,
"Cart updated successfully",
result
)
);

});


exports.removeItem =
asyncHandler(async(req,res)=>{

const result =
await removeCartItem(
req.user.id,
req.params.productId
);

res.status(200).json(
new ApiResponse(
true,
"Item removed",
result
)
);

});


exports.clearUserCart =
asyncHandler(async(req,res)=>{

const result =
await clearCart(
req.user.id
);

res.status(200).json(
new ApiResponse(
true,
"Cart cleared",
result
)
);

});

exports.checkout =
asyncHandler(async(req,res)=>{

const result =
await checkoutCart(
req.user.id
);

res.status(201).json(
new ApiResponse(
true,
"Order placed successfully",
result
)
);

});