var express = require ("express");
var BodyParser = require ("body-parser");
var mongoose = require("mongoose");
var app = express();
var Campground = require("./models/campground"); //refactoring campground schema to separate file
var seedDB = require ("./seeds");
var Comment = require("./models/comment");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var User = require("./models/user");
var methodOverride = require("method-override");
var flash = require("connect-flash");
var port = 3000;

//REQUIRING ROUTES
var commentRoutes    = require("./routes/comments");
var indexRoutes      = require("./routes/index");
var campgroundRoutes = require("./routes/campground");

//seedDB();
app.use(express.static(__dirname+"/public"));
app.use(BodyParser.urlencoded({ extended: true }));
app.set("view engine","ejs");
app.listen(port,function(){
    console.log ("Server started on port "+port);
});
app.use(methodOverride("_method"));
app.use(flash());
mongoose.connect("mongodb://localhost/yelp_camp",{ useNewUrlParser: true });
//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Hi There",
    resave: false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())); //authenticate method from passport-local-mongoose
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//PASSPORT CONFIGURATION

//Add Middleware to check the user
//Call this function on every templates
app.use(function(req,res,next){
    res.locals.currentUser = req.user; //get user data and save to currentUser variable
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});
app.use(indexRoutes);
app.use(commentRoutes);
app.use(campgroundRoutes);




    
