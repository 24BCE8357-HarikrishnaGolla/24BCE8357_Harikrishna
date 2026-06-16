const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

const {
  register,
  login,
} = require("../controllers/authController");

router.post("/register", register);

router.post("/login", login);
router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Protected route accessed successfully",
    user: req.user,
  });
});
module.exports = router;