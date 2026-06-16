const getUserCollection = require("../models/User");

const { hashPassword, comparePassword } = require("../utils/hashPassword");

const generateToken = require("../utils/generateToken");

const ROLES = require("../constants/roles");

const ApiError = require("../utils/ApiError");

// Register User

async function registerUser(userData) {
  const users = getUserCollection();

  const { name, email, password } = userData;

  // Check if user already exists
  const existingUser = await users.findOne({ email });

  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }

  // Hash password
  const hashedPassword = await hashPassword(password);

  const newUser = {
    name,
    email,
    password: hashedPassword,
    role: ROLES.CUSTOMER,
    createdAt: new Date(),
  };

  // MongoDB insertOne()
  const result = await users.insertOne(newUser);

  return {
    userId: result.insertedId,
    name,
    email,
    role: ROLES.CUSTOMER,
  };
}

// Login User

async function loginUser(userData) {
  const users = getUserCollection();

  const { email, password } = userData;

  // Find user
  const user = await users.findOne({ email });

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  // Compare password
  const isMatch = await comparePassword(
    password,
    user.password
  );

  if (!isMatch) {
    throw new ApiError(401, "Invalid email or password");
  }

  // Generate JWT
  const token = generateToken(user);

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
}

module.exports = {
  registerUser,
  loginUser,
};