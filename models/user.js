const mongoose=require("mongoose");
const schema=mongoose.Schema;
const passportLocalMongoose=require("passport-local-mongoose")

const Userschema = new schema({
    // username:{
    //     type:String,
    // }, username is automatically added
    email:{
        type:String,
        required:true
    }
})

Userschema.plugin(passportLocalMongoose);

module.exports=mongoose.model("User",Userschema)