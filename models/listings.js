const mongoose=require("mongoose");
const schema=mongoose.Schema;
const Review = require("./Reviews.js");

const listingSchema=new schema({
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
    },
    image:{
        url:String,
        filename:String
    },
    price:{
        type:Number,
        require:true,
    },
    location:{
        type:String,
    },
    country:{
        type:String,
    },
    review:[
        {
            type:schema.Types.ObjectId,
            ref:"reviews"
        }
    ],
    owner:{
        type:schema.Types.ObjectId,
        ref:"User"
    }
})

listingSchema.post("findOneAndDelete", async(listing)=>{
    if(listing){
        await Review.deleteMany({_id:{$in:listing.review}});
    }
});

const listing= mongoose.model("listing",listingSchema);
module.exports=listing;