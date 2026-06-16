const {
  registerUser,
  loginUser,
} = require("../services/authService");

const asyncHandler = require("../middleware/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

// Register

exports.register = asyncHandler(async (req, res) => {
  const result = await registerUser(req.body);

  res.status(201).json(
    new ApiResponse(
      true,
      "User registered successfully",
      result
    )
  );
});

// Login

exports.login = asyncHandler(async (req, res) => {
  const result = await loginUser(req.body);

  res.status(200).json(
    new ApiResponse(
      true,
      "Login successful",
      result
    )
  );
});