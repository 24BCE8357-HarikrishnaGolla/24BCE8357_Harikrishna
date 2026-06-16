module.exports = (req, res, next) => {

  const {

    name,

    description,

    category,

    price,

    stock,

    imageUrl

  } = req.body;

  if (!name || name.trim() === "") {

    return res.status(400).json({

      success: false,

      message: "Product name is required"

    });

  }

  if (!description || description.trim() === "") {

    return res.status(400).json({

      success: false,

      message: "Description is required"

    });

  }

  if (!category || category.trim() === "") {

    return res.status(400).json({

      success: false,

      message: "Category is required"

    });

  }

  if (price == null || isNaN(price) || Number(price) < 0) {

    return res.status(400).json({

      success: false,

      message: "Invalid price"

    });

  }

  if (stock == null || isNaN(stock) || Number(stock) < 0) {

    return res.status(400).json({

      success: false,

      message: "Invalid stock"

    });

  }

  if (

    imageUrl &&

    !/^https?:\/\/.+/i.test(imageUrl)

  ) {

    return res.status(400).json({

      success: false,

      message: "Invalid image URL"

    });

  }

  next();

};