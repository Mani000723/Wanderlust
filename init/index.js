const mongoose=require("mongoose");
const initData=require("./data.js")
const Listing=require("../models/listings.js");
const { object } = require("joi");

main()
.then(()=>{
    console.log("connection succesful");
})
.catch((err)=>{
    console.log(err);
})
async function main(){
    await mongoose.connect("mongodb+srv://mukkamanideep38:QitSgauOFMalMJuQ@wanderlust.gk1bqc7.mongodb.net/");
}

const initdata= async()=>
{
  await Listing.deleteMany({});
  initData.data=initData.data.map((obj)=>({...obj,owner:"687f9b93dbef88da49130f4a"}))
  await Listing.insertMany(initData.data);
  console.log("added");
}
initdata();