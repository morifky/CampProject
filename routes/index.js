var express = require("express");
var router = express.Router();
var User = require("../models/user");
var passport = require("passport");

//AUTH ROUTES
//Register route
router.get("/register",function(req,res){
    res.render("register");
})
//Register Logic
router.post("/register",function(req,res){
    var newUser = new User({username: req.body.username}); //create new user and save to userDB
    User.register(newUser,req.body.password,function(err,user){
        if(err){
            req.flash("error",err.message);
            return res.redirect("register");
        }
        passport.authenticate("local")(req,res,function(){
            res.redirect("/campgrounds");
        })
    })
})
//Login Routes
router.get("/login",function(req,res){
    res.render("login");
})
//Login Logic
router.post("/login",passport.authenticate("local",
{
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}) ,function(req,res){
// use passport.authenticate, and check if user already registered, redirect to /campgrounds,else to /login
})
//logout logic
router.get("/logout",function(req,res){
    req.logout();
    req.flash("success","successfully logout")
    res.redirect("/campgrounds");
});

module.exports = router;