const asyncHandler=
require("../middleware/asyncHandler");

const ApiResponse=
require("../utils/ApiResponse");

const{

dashboardSummary

}=require("../services/categoryDashboardService");

exports.summary=

asyncHandler(

async(req,res)=>{

const result=
await dashboardSummary();

res.json(

new ApiResponse(

true,

"Category Dashboard",

result

)

);

}

);