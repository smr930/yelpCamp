const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");

// Route: "/"    => root page
router.get("/", (req, res) => {
    res.render("landing");
});

//============================================================
// AUTHENTICATION ROUTES  
//============================================================

// show register form
router.get("/register", (req, res) => {
     res.render("register", {page: 'register'});
 });

 // handle signup logic
router.post("/register", (req, res) => {
     let newUser = new User({username: req.body.username});
     User.register(newUser, req.body.password, (err, user) => {
         if(err) {
            req.flash("error", err.message);
            return res.redirect("register");
         } 
         passport.authenticate("local")(req, res, () => {
            req.flash("success", "Welcome to YelpCamp " + user.username);
            res.redirect("/campgrounds");
         });         
     });
 });

 // show login form
 router.get("/login", (req, res) => {
     res.render("login", {page: 'login'});
 });

 // handling login logic with a middelware
router.post("/login", passport.authenticate("local", {
     successRedirect: "/campgrounds", 
     failureRedirect: "/login"
    }), (req, res) => {
     
 });

 // logout route
router.get("/logout", (req, res) => {
     req.logout();
     req.flash("success", "Succesfully logged out");
     res.redirect("/campgrounds");
 });

module.exports = router;
