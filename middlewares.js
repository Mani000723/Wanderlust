const listing=require("./models/listings");
const review=require("./models/Reviews.js");
const {listingSchema,reviewSchema}=require("./schema.js");
const ExpressError=require("./utils/ExpressError.js");

module.exports.isLoggedin=(req,res,next)=>{
     if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("failure" , "You need to login before adding a listing");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveredirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner= async(req,res,next)=>{
    let {id}=req.params;
    let listingData=await listing.findById(id);
    if(!listingData.owner._id.equals(res.locals.currUser._id)){
        console.log("It's here");
        req.flash("failure" , "You don't have permission");
        return res.redirect(`/listings/${id}`)
    }
    next();
}

module.exports.isAuthor= async(req,res,next)=>{
    let {id,reviewid}=req.params;
    let reviewData=await review.findById(reviewid);
    if(!reviewData.author._id.equals(res.locals.currUser._id)){
        req.flash("failure" , "You don't have permission");
        return res.redirect(`/listings/${id}`)
    }
    next();
}
module.exports.validateListing=async(req,res,next)=>{
    let {err}=listingSchema.validate(req.body);
    if(err){
        throw new ExpressError(400,err);
    }
    else{
        next();
    }
}

module.exports.validateReview=(req,res,next)=>{
    let {err}=reviewSchema.validate(req.body);
    if(err){
        throw new ExpressError(400,err);
    }
    else{
        next();
    }
}

