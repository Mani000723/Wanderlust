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
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

const initdata= async()=>
{
  await Listing.deleteMany({});
  initData.data=initData.data.map((obj)=>({...obj,owner:"687b5b910466c6311fcc801f"}))
  await Listing.insertMany(initData.data);
  console.log("added");
}
initdata();