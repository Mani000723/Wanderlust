const listing = require("../models/listings.js");
const Review = require("../models/Reviews.js");

module.exports.postreview=async(req,res)=>{
    let listings= await listing.findById(req.params.id);
    let newreview= new Review(req.body);
    newreview.author=req.user._id;
    listings.review.push(newreview);
    await newreview.save();
    await listings.save();
    req.flash("success","review added successfully");  
    res.redirect(`/listings/${listings.id}`)
};

module.exports.deletereview=async(req,res)=>{
    let {id,reviewid}=req.params;
    await listing.findByIdAndUpdate(id,{$pull:{review:reviewid}});
    await Review.findByIdAndDelete(reviewid)
    req.flash("success","review deleted successfully");  
    res.redirect(`/listings/${id}`)
};