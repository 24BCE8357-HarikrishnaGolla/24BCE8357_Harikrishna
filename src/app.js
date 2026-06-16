const express = require("express");
const cors = require("cors");
const categoryRoutes = require("./routes/categoryRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const errorHandler=require("./middleware/errorHandler");
const categoryDashboardRoutes=require("./routes/categoryDashboardRoutes");
const orderRoutes = require("./routes/orderRoutes");
const salesDashboardRoutes = require("./routes/salesDashboardRoutes");
const cartRoutes = require("./routes/cartRoutes");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "E-Commerce Management System API is running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/products",productRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/category-dashboard",categoryDashboardRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/sales-dashboard",salesDashboardRoutes);
app.use("/api/cart",cartRoutes);
app.use(errorHandler);

module.exports = app;