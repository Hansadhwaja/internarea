const express =require("express")
const router= express.Router();
const ApplicationRoute=require("./ApplicationRoute")
const intern=require("./internshipRout")
const job=require("./jobRoute")
const admin=require("./admin")
const emailVerify = require('./email')
const loginHistory = require('./loginHistory')

router.get("/",(req,res)=>{
    res.send("this is api backend")
})
router.use('/application',ApplicationRoute);
router.use('/internship',intern);
router.use('/job',job);
router.use('/admin',admin);
router.use('/email',emailVerify);
router.use('/history',loginHistory);

module.exports=router;


