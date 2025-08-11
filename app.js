if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodoverride = require("method-override");
const ejsmate = require("ejs-mate");
const listings = require("./routes/listing.js");
const reviews = require("./routes/reviews.js");
const users = require("./routes/user.js");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require("connect-mongo"); // used to connect with our mongoatlas
const flash = require("connect-flash");

const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const dburl = process.env.ATLAS_URL;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodoverride("_method"));
app.engine("ejs", ejsmate);

const store = MongoStore.create({
  mongoUrl: dburl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

store.on("error", () => {
  console.log("Error occured in mongo atlas", err);
});
const sessionoptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
  store: MongoStore.create({
    mongoUrl: process.env.ATLAS_URL, // Make sure this line exists
  }),
};

app.use(session(sessionoptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.failure = req.flash("failure");
  res.locals.currUser = req.user;
  next();
  // In Express.js, res.locals is an object that contains local variables specific to the current request-response cycle. These variables are available to middleware functions, route handlers, and especially to the view templates rendered during that particular request.
});

// app.get("/registeruser",async (req,res)=>{
//     let fakeuser=new User({
//         email:"mani@gmail.com",
//         username:"mani0007",
//     })
//     let newuser= await User.register(fakeuser,"5544")//5544 pwd
//     res.send(newuser);
// })

main()
  .then(() => {
    console.log("connection succesful");
  })
  .catch((err) => {
    console.log(err);
  });
async function main() {
  await mongoose.connect(dburl);
}

app.listen(7070, () => {
  console.log("listening in 7070");
});

app.use("/", listings);
app.use("/", reviews);
app.use("/", users);

app.all("/{*any}", (req, res, next) => {
  next(new ExpressError(404, "Page not found"));
});

// we can set input type of price to number , but when we get a wrong datatype from postman we need to handle it
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong" } = err;
  res.render("listings/error.ejs", { message });
});
