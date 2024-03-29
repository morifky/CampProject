var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middlewareObj = {}

middlewareObj.checkCampgroundOwnership = function (req,res,next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id,function(err,foundCampground){
            if(err){
                res.redirect("back");
            }
            else{
                //does user own the campground?
                if(foundCampground.author.id.equals(req.user._id)){
                    next()
                }
                else{
                    res.redirect("back");
                }
            }
        })
    }
    else{
        res.redirect("back")
    }
}

middlewareObj.checkCommentOwnership = function (req,res,next){
    if(req.isAuthenticated()){
        //find specific campground
        Campground.findById(req.params.id,function(err,foundCampground){
            if(err){
                res.redirect("back")
            }
            else{
                //find specific comment
                Comment.findById(req.params.comment_id,function(err,foundComment){
                    if(err){
                        res.redirect("back")
                    }
                    else{
                        //does user own the comment?
                        if(foundComment.author.id.equals(req.user._id)){
                            next()
                        }
                        else{
                            res.redirect("back")
                        }
                    }
                })
            }
        })
    }
    else{
        res.redirect("back")
    }
}
middlewareObj.isLoggedIn = function (req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","Please Logged in first")
    res.redirect("/login");
}

module.exports = middlewareObj;