const Listing=require("../models/listings");
const listing = require("../models/listings.js");



module.exports.index=async(req,res)=>{
    let alllistings=await Listing.find({});
    res.render("listings/index.ejs" ,{alllistings});
}

module.exports.renderNew=(req,res)=>{
    res.render("listings/new.ejs"); //is loggedin middleware;
};

module.exports.show=async(req,res)=>{
    let {id}=req.params;
    let showData= await listing.findById(id).populate({path:"review",populate:{path:"author"}}).populate("owner");
    if(!showData){
    req.flash("failure","The listing yor requested is not available");  
    return res.redirect("/listings")
    }
    res.render("listings/show.ejs",{showData});
};

module.exports.postNew=async(req,res,next)=>{
    const url=req.file.path;
    const filename=req.file.filename;
    let listingData = req.body.listing;
    listingData.owner=req.user._id;
    listingData.image={url,filename};
    await listing.insertOne(listingData);
    req.flash("success","new listing added successfully");  
    res.redirect("/listings");
};

module.exports.delete=async(req,res)=>{
    let {id}=req.params;
    await listing.findByIdAndDelete(id);
    req.flash("success","listing deleted successfully");  
    res.redirect("/listings");
};

module.exports.renderEdit=async(req,res,next)=>{
    let {id}=req.params;
    let showData= await listing.findById(id);
    if(!showData){
    req.flash("failure","The listing yor requested is not available");  
    return res.redirect("/listings")
    }
    let originalimageurl=showData.image.url;
    originalimageurl=originalimageurl.replace("/upload","/upload/h_250,w_250");
    req.flash("success","edited successfully");  
    res.render("listings/edit.ejs",{showData,originalimageurl});
    // try catch block catches the async errors
    // try{
    // let {id}=req.params;
    // let showData= await listing.findById(id);
    // res.render("listings/edit.ejs",{showData});
    // }
    // catch(err){
    //     next(err); // calls our error middleware handler i.e router.use
    // }
};

module.exports.postEdit=async(req,res)=>{
    // if(!req.body.listing){
    //     throw new ExpressError(400,"Send valid data");
    // } instead of each if for a model we use JOI
    let {id}=req.params;
    let listing=await listing.findByIdAndUpdate(id,{...req.body.listing});
    if(typeof req.file !=undefined){
    const url=req.file.path;
    const filename=req.file.filename;
    listing.image={url,filename};
    await listing.save();
    }
    req.flash("success","Updated successfully");
    res.redirect(`/listings/${id}`);
};