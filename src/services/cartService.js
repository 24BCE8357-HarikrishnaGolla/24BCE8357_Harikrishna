const { ObjectId } = require("mongodb");

const getCartCollection =
  require("../models/Cart");

const getProductCollection =
  require("../models/Product");

const ApiError =
  require("../utils/ApiError");


// ADD TO CART

async function addToCart(
  userId,
  productId,
  quantity
) {

  const carts =
    getCartCollection();

  const products =
    getProductCollection();

  const product =
    await products.findOne({
      _id: new ObjectId(productId)
    });

  if (!product) {
    throw new ApiError(
      404,
      "Product not found"
    );
  }

  let cart =
    await carts.findOne({
      userId: new ObjectId(userId)
    });

  if (!cart) {

    const newCart = {
      userId:
        new ObjectId(userId),

      items: [
        {
          productId:
            product._id,

          name:
            product.name,

          price:
            product.price,

          quantity
        }
      ],

      createdAt:
        new Date()
    };

    await carts.insertOne(
      newCart
    );

    return newCart;
  }

  const existingItem =
    cart.items.find(
      item =>
        item.productId.toString() ===
        productId
    );

  if (existingItem) {

    await carts.updateOne(
      {
        userId:
          new ObjectId(userId),

        "items.productId":
          new ObjectId(productId)
      },
      {
        $inc: {
          "items.$.quantity":
            quantity
        }
      }
    );

  } else {

    await carts.updateOne(
      {
        userId:
          new ObjectId(userId)
      },
      {
        $push: {
          items: {
            productId:
              product._id,

            name:
              product.name,

            price:
              product.price,

            quantity
          }
        }
      }
    );

  }

  return {
    message:
      "Product added to cart"
  };
}


// GET CART

async function getCart(
  userId
) {

  const carts =
    getCartCollection();

  return await carts.findOne({
    userId:
      new ObjectId(userId)
  });

}


// UPDATE QUANTITY

async function updateCartItem(
  userId,
  productId,
  quantity
) {

  const carts =
    getCartCollection();

  const result =
    await carts.updateOne(
      {
        userId:
          new ObjectId(userId),

        "items.productId":
          new ObjectId(productId)
      },
      {
        $set: {
          "items.$.quantity":
            quantity
        }
      }
    );

  if (
    result.matchedCount === 0
  ) {

    throw new ApiError(
      404,
      "Cart item not found"
    );

  }

  return result;
}


// REMOVE ITEM

async function removeCartItem(
  userId,
  productId
) {

  const carts =
    getCartCollection();

  return await carts.updateOne(
    {
      userId:
        new ObjectId(userId)
    },
    {
      $pull: {
        items: {
          productId:
            new ObjectId(productId)
        }
      }
    }
  );

}


// CLEAR CART

async function clearCart(
  userId
) {

  const carts =
    getCartCollection();

  return await carts.deleteOne({
    userId:
      new ObjectId(userId)
  });

}
const getOrderCollection =
  require("../models/Order");

async function checkoutCart(userId) {

  const carts =
    getCartCollection();

  const orders =
    getOrderCollection();

  const products =
    getProductCollection();

  const cart =
    await carts.findOne({
      userId:
        new ObjectId(userId)
    });

  if (!cart || cart.items.length === 0) {

    throw new ApiError(
      400,
      "Cart is empty"
    );

  }

  let totalAmount = 0;

  for (const item of cart.items) {

    const product =
      await products.findOne({
        _id: item.productId
      });

    if (!product) {

      throw new ApiError(
        404,
        `${item.name} not found`
      );

    }

    if (
      product.stock <
      item.quantity
    ) {

      throw new ApiError(
        400,
        `Insufficient stock for ${product.name}`
      );

    }

    totalAmount +=
      product.price *
      item.quantity;

  }

  // Deduct Stock

  for (const item of cart.items) {

    await products.updateOne(
      {
        _id:
          item.productId
      },
      {
        $inc: {
          stock:
            -item.quantity
        }
      }
    );

  }

  const order = {

    userId:
      new ObjectId(userId),

    products:
      cart.items,

    totalAmount,

    status:
      "Pending",

    createdAt:
      new Date()

  };

  const result =
    await orders.insertOne(order);

  await carts.deleteOne({
    userId:
      new ObjectId(userId)
  });

  return {

    orderId:
      result.insertedId,

    totalAmount

  };

}

module.exports = {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
  clearCart,
  checkoutCart
};