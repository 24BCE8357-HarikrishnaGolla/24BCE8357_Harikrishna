module.exports = (req, res, next) => {
  const {
    name,
    description,
    imageUrl,
  } = req.body;

  if (!name || name.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Category name is required",
    });
  }

  if (!description || description.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Category description is required",
    });
  }

  if (
    imageUrl &&
    !/^https?:\/\/.+/i.test(imageUrl)
  ) {
    return res.status(400).json({
      success: false,
      message: "Invalid image URL",
    });
  }

  next();
};