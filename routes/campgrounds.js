const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");
const middleware = require("../middleware/index");
const helper = require("../helper");

// Route: INDEX "/campgrounds" => show all the campgrounds
router.get("/", (req, res) => {
    // get all campgrounds from db
    Campground.find({}, (err, allCampgrounds) => {
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds, page: 'campgrounds'});
        }
    });    
});

// Route: CREATE "/campgrounds" => add new campgound to db 
router.post("/", middleware.isLoggedIn, (req, res) => {
    // get data from form and add to campgrounds array
    const name = req.body.name;
    const image = req.body.image;
    const desc = req.body.desc;
    const price = req.body.price;
    const address = req.body.address;
    const phone = req.body.phone;

    const author = {
        id: req.user._id,
        username:req.user.username
    }
    const newCampgroundObj = {
        name: name, image: image, desc: desc, 
        price: price, address: address, phone: phone, 
        author: author
    };
    
    // create a new campground and save to db
    Campground.create(newCampgroundObj, (err, newlyCreated) => {
        if(err) {
            console.log(err);
        } else {
            // redirect back to campgrounds page
            //console.log(newlyCreated);
            res.redirect("/campgrounds");
        }
    });
});

// Route: NEW "/campgrounds/new" => show form to create new campground 
router.get("/new", middleware.isLoggedIn, (req, res) => {
   res.render("campgrounds/new"); 
});

// Route: SHOW "/campgrounds/:id" => show more info about one campground 
router.get("/:id", (req, res) => {
    // find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
        if(err){
            console.log(err);
        } else {
            // render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground, helper: helper}); 
        }
    });
 });

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, (req, res) => {
    // BUG:(fixed) use model.findByIdAndUpdate() instead of model.findOneAndUpdate()
    // https://stackoverflow.com/questions/53046455/mongoose-delete-item-first-one-always-gets-deleted
    
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
        if(err) {
            console.log("err in update camground route");
            res.redirect("/campgrounds");
        } else {
            console.log(updatedCampground);
            res.redirect("/campgrounds/" + updatedCampground._id);
        }
    });
});

// DESTROY/DELETE CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findByIdAndRemove(req.params.id, (err) => {
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            console.log("Success: deleted campground");
            res.redirect("/campgrounds");
        }
    });
});

 module.exports = router;
