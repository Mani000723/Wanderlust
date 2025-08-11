const express=require("express");
const router=express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const {saveredirectUrl}=require("../middlewares.js")
const usersController=require("../controllers/users.js");


router.get("ec2-65-1-147-223.ap-south-1.compute.amazonaws.com/signup",usersController.renderSignupform);

router.post("ec2-65-1-147-223.ap-south-1.compute.amazonaws.com/signup",wrapAsync(usersController.postSignupform));

router.get("ec2-65-1-147-223.ap-south-1.compute.amazonaws.com/login",usersController.renderLoginform);

router.post("ec2-65-1-147-223.ap-south-1.compute.amazonaws.com/login" ,saveredirectUrl,passport.authenticate('local', {
successRedirect: 'ec2-65-1-147-223.ap-south-1.compute.amazonaws.com/listings',
failureRedirect: 'ec2-65-1-147-223.ap-south-1.compute.amazonaws.com/login',
failureFlash: true}),usersController.postLogin);

router.get("ec2-65-1-147-223.ap-south-1.compute.amazonaws.com/logout",usersController.logout);
module.exports=router;