const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js")
const { isLoggedin,isOwner,validateListing } = require("../middlewares.js");
const listingcontroller=require("../controllers/listings.js");
const multer=require("multer");
const {storage}=require("../cloudconfig.js");
const upload=multer({storage});

router.get("ec2-65-1-147-223.ap-south-1.compute.amazonaws.com/listings",wrapAsync(listingcontroller.index));

router.get("ec2-65-1-147-223.ap-south-1.compute.amazonaws.com/listings/new",isLoggedin,listingcontroller.renderNew);

router.get("ec2-65-1-147-223.ap-south-1.compute.amazonaws.com/listings/:id" ,wrapAsync(listingcontroller.show));

router.post("ec2-65-1-147-223.ap-south-1.compute.amazonaws.com/listings",isLoggedin,validateListing,upload.single("listing[image]"),wrapAsync(listingcontroller.postNew));

router.delete("ec2-65-1-147-223.ap-south-1.compute.amazonaws.com/listings/:id",isLoggedin, isOwner,(listingcontroller.delete));

router.get("ec2-65-1-147-223.ap-south-1.compute.amazonaws.com/listings/:id/edit" ,isLoggedin, isOwner,wrapAsync(listingcontroller.renderEdit));

router.patch("ec2-65-1-147-223.ap-south-1.compute.amazonaws.com/listings/:id" ,isLoggedin, isOwner,upload.single("listing[image]"),validateListing,wrapAsync(listingcontroller.postEdit));

module.exports=router;