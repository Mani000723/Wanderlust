const User = require("../models/user.js");

module.exports.renderSignupform = (req, res) => {
  res.render("users/signup.ejs");
};

module.exports.postSignupform = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    let newuser = new User({ email, username });
    const registeruser = await User.register(newuser, password);
    req.login(registeruser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "User registered successfully"); //flash message is stored in the session no resp is sent
      res.redirect("/listings");
    });
  } catch (err) {
    req.flash("failure", err.message);
    res.redirect("/signup"); //redirect makes a new GET request
  }
  //     So, the call flow is:

  // req.flash() (store message in session)
  // res.redirect() (end request, browser makes new request)
  // Middleware runs on new request, puts flash message in res.locals
  // Template renders and displays the message

  //     How does Express know to call the middleware?
  // Order matters: Express runs middleware in the order you define them.
  // For every request: If you use app.use() without a path, it runs for every request.
  // If you use a path: e.g. app.use('/listings', ...), it only runs for routes starting with /listings.s
};

module.exports.renderLoginform = (req, res) => {
  res.render("users/login.ejs");
};

module.exports.postLogin = async (req, res) => {
  try {
    res.send("it's working");
  } catch (err) {
    console.log(err.message);
  }
};

module.exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "logged out successfully");
    res.redirect("/listings");
  });
};
