const express=require("express");

const router=express.Router();

const authMiddleware=
require("../middleware/authMiddleware");

const adminMiddleware=
require("../middleware/adminMiddleware");

const{

summary

}=require("../controllers/categoryDashboardController");

router.get(

"/summary",

authMiddleware,

adminMiddleware,

summary

);

module.exports=router;