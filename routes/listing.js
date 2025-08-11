const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js")
const { isLoggedin,isOwner,validateListing } = require("../middlewares.js");
const listingcontroller=require("../controllers/listings.js");
const multer=require("multer");
const {storage}=require("../cloudconfig.js");
const upload=multer({storage});

router.get("/listings",wrapAsync(listingcontroller.index));

router.get("/listings/new",isLoggedin,listingcontroller.renderNew);

router.get("/listings/:id" ,wrapAsync(listingcontroller.show));

router.post("/listings",isLoggedin,validateListing,upload.single("listing[image]"),wrapAsync(listingcontroller.postNew));

router.delete("/listings/:id",isLoggedin, isOwner,(listingcontroller.delete));

router.get("/listings/:id/edit" ,isLoggedin, isOwner,wrapAsync(listingcontroller.renderEdit));

router.patch("/listings/:id" ,isLoggedin, isOwner,upload.single("listing[image]"),validateListing,wrapAsync(listingcontroller.postEdit));

module.exports=router;