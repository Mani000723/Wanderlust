const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js")
const {validateReview,isLoggedin,isOwner,isAuthor}=require("../middlewares.js");
const reviewcontroller=require("../controllers/reviews.js");

router.post("/listings/:id/reviews" ,isLoggedin,validateReview,wrapAsync(reviewcontroller.postreview))

console.log("it's here");
router.delete("/listings/:id/reviews/:reviewid" , isLoggedin,isAuthor,wrapAsync(reviewcontroller.deletereview))

module.exports=router;
