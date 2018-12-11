var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware/index");



//Default Route
router.get("/",function(req,res){
    res.redirect("/campgrounds");
});
//ROUTE TO CAMPGROUND LIST
router.get("/campgrounds",function(req,res){
    Campground.find({},function(err,allCampgrounds){
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/index",{data:allCampgrounds});
        }
    });
   
});
//POST NEW CAMPGROUND
router.post("/campgrounds",middleware.isLoggedIn,function(req,res){
    var newname = req.body.name;
    var newimage = req.body.image;
    var newdescription = req.body.description;
    var newauthor = {
        id: req.user._id,
        username: req.user.username
    }
    var newObj = {name:newname,image:newimage,description:newdescription,author:newauthor};
    Campground.create(newObj,function(err,AddCampground){
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/campgrounds");
        };
    });
    
});
//ROUTE TO NEW CAMPGROUND PAGE
router.get("/campgrounds/new",middleware.isLoggedIn,function(req,res){
    res.render("campgrounds/new");
});

//ROUTE TO FIND CAMPGROUND
router.get("/campgrounds/:id",function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/show",{campground:foundCampground})
        }
    })
});

//ROUTE TO EDIT CAMPGROUND
router.get("/campgrounds/:id/edit",middleware.checkCampgroundOwnership,function(req,res){
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err)
        }
        else{
            res.render("campgrounds/edit",{campground:campground});
        }
    });
});
//UPDATE CAMPGROUND
router.put("/campgrounds/:id",middleware.checkCampgroundOwnership,function(req,res){
    Campground.findByIdAndUpdate(req.params.id,req.body.body,function(err,updateCampground){
        if(err){
            res.redirect("/campgrounds");
        }
        else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
})
//DELETE CAMPGROUND
router.delete("/campgrounds/:id/delete",middleware.checkCampgroundOwnership,function(req,res){
    Campground.findByIdAndDelete(req.params.id,function(err,deleteCampground){
        if(err){
            res.send("CANNOT DELETE CAMPGROUND")
        }
        else{
            res.redirect("/campgrounds")
        }
    })
});
module.exports = router;