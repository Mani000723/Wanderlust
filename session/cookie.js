const express=require("express");
const app=express();
const session = require('express-session');
const flash=require("connect-flash");
const path=require("path");


app.set("view engine" ,"ejs");
app.set("views",path.join(__dirname,"views"));

// app.use(session(...))
// This tells your Express app to use sessions, which allow you to store data for each user across requests (like login info, shopping carts, etc.).

// secret: "thisissecret"
// The secret is a string used by express-session to sign the session ID cookie.
// This helps prevent tampering—only your server knows this secret, so it can verify that the session data hasn’t been changed by the client.
app.use(session({secret:"thisissecret"}));
app.use(flash());


app.listen("8000",()=>{
    console.log("loading");    
})

app.get("/register",(req,res)=>{
    let {name}=req.query;
    req.session.name=name // req.session.name is the variable name to store query string name'
    req.flash("success","user registered successfully");
    res.redirect("/hello")
});

app.get("/hello",(req,res)=>{
    // res.send(`hi ${req.session.name}`); //using the session storage;
    //flash message gets diasppears after a refresh
    //if we send message through a normal variable it remains displayed.
    res.render("session.ejs",{name:req.session.name,msg:req.flash("success")});
})

