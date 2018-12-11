var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware/index");

//ROUTE TO ADDING NEW COMMENTS
router.get("/campgrounds/:id/comments/new",middleware.isLoggedIn,function(req,res){
    Campground.findById(req.params.id,function(err,campground){
        res.render("comments/new",{campground:campground})
    });
})
//ROUTE TO POST THE NEW COMMENTS
router.post("/campgrounds/:id/comments",middleware.isLoggedIn,function(req,res){
    //Lookup campground by ID
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds")
        }
        else {
            //Create new comments
            Comment.create(req.body.comment,function(err,comment){
                if(err){
                    console.log(err);
                }
                else{
                    //add username and ID to comment
                    comment.author.id = req.user._id //fill author.id with user._id when user logged in
                    comment.author.username = req.user.username //fiil author.username with user.username when user logged in
                    //save comment
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    //redirect to show page
                    res.redirect("/campgrounds/"+campground._id)
                }
            })
        }
    })
})
//EDIT COMMENT
router.get("/campgrounds/:id/comments/:comment_id/edit",middleware.checkCommentOwnership,function(req,res){
    //Find specific Campground
    Campground.findById(req.params.id,function(err,foundCampground){
        if(err){
            console.log(err);
        }
        else{
            //Find specific Comment
            Comment.findById(req.params.comment_id,function(err,foundComment){
                if(err){
                    console.log(err);
                }
                else{
                    res.render("comments/edit",{campground:foundCampground,comment:foundComment})
                }
            })
        }
    })
   
})
//UPDATE COMMENT
router.put("/campgrounds/:id/comments/:comment_id",middleware.checkCommentOwnership,function(req,res){
    //Find specific Campground
    Campground.findById(req.params.id,function(err,foundCampground){
        if(err){
            console.log(err)
        }
        else{
            //Update Comment
            Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updateComment){
                if(err){
                    res.redirect("back")
                }
                else{
                    res.redirect("/campgrounds/"+req.params.id);
                }
            })
        }
    })
})
//DELETE COMMENT
router.delete("/campgrounds/:id/comments/:comment_id/delete",middleware.checkCommentOwnership,function(req,res){
    //Find specific Campground
    Campground.findById(req.params.id,function(err,foundCampground){
        if(err){
            res.redirect("back");
        }
        else{
            //Delete Comment
            Comment.findByIdAndRemove(req.params.comment_id,function(err,deleteComment){
                if(err){
                    res.redirect("back")
                }
                else{
                    res.redirect("/campgrounds/"+req.params.id);
                }
            })
        }
    })
})

module.exports = router;