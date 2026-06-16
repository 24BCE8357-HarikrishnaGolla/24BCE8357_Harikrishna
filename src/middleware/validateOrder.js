module.exports = (req, res, next) => {

  const { userId, products } = req.body;

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "User Id is required",
    });
  }

  if (!products || !Array.isArray(products) || products.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Products array is required",
    });
  }

  for (const item of products) {

    if (!item.productId) {
      return res.status(400).json({
        success: false,
        message: "Product Id is required",
      });
    }

    if (!item.quantity || item.quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be greater than 0",
      });
    }

  }

  next();

};