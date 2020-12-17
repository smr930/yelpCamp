const express     = require("express");
const app         = express();
const bodyParser  = require("body-parser");
const mongoose    = require("mongoose");
const flash       = require("connect-flash");
const passport    = require("passport");
const LocalStrategy = require("passport-local");
const methodOverride = require("method-override");
const Campground  = require("./models/campground");
const Comment       = require("./models/comment");
const User        = require("./models/user");
//const seedDB      = require("./seeds");

// create variables for different routes that are in seperate files
const indexRoutes = require("./routes/index");
const campgroundRoutes = require("./routes/campgrounds");
const commentRoutes = require("./routes/comments");

// passport configuration
app.use(require("express-session")( {
    secret: "Using VS Code is great!",
    resave: false,
    saveUninitialized: false
}));

app.locals.moment = require('moment'); // time since feature
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

mongoose.connect(process.env.DATABASEURL, {
  useUnifiedTopology: true, 
  useNewUrlParser: true,
  useFindAndModify: false
});

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public")); // serve public dir
app.use(methodOverride("_method"));
app.use(flash());
//seedDB(); // everytime the server starts, populate camprounds with text/img

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

// utilize express router and add prefix to route
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes); 
app.use("/campgrounds/:id/comments", commentRoutes);

// Tell Express to listen for reqests (start server)
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Yelp Camp App has Started!");
});

