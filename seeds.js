var mongoose =require ("mongoose");
var Campground = require ("./models/campground");
var Comment = require("./models/comment")
var data = [
    {
        name : "Cloud's Rest",
        image : "https://images.unsplash.com/photo-1517824806704-9040b037703b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a arcu at orci volutpat scelerisque quis sed mauris. Morbi suscipit odio pretium lorem bibendum, sit amet sagittis ante viverra. Aliquam euismod dui ullamcorper, ornare turpis eu, euismod est. Etiam sed nisl vitae ante fringilla congue vel vitae nisi. Suspendisse vel elit mollis, consequat urna eu, ornare diam. Quisque non ipsum a tortor ultrices pellentesque ut vitae nibh. Integer a mollis justo. In fermentum erat id dolor tempus, a commodo felis venenatis. Curabitur vitae cursus magna. Praesent in sem vel ante pretium sodales. In sit amet urna tempor, egestas ligula nec, accumsan massa. "
    },
    {
        name : "Lake's Edge",
        image : "https://images.unsplash.com/photo-1506535995048-638aa1b62b77?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a arcu at orci volutpat scelerisque quis sed mauris. Morbi suscipit odio pretium lorem bibendum, sit amet sagittis ante viverra. Aliquam euismod dui ullamcorper, ornare turpis eu, euismod est. Etiam sed nisl vitae ante fringilla congue vel vitae nisi. Suspendisse vel elit mollis, consequat urna eu, ornare diam. Quisque non ipsum a tortor ultrices pellentesque ut vitae nibh. Integer a mollis justo. In fermentum erat id dolor tempus, a commodo felis venenatis. Curabitur vitae cursus magna. Praesent in sem vel ante pretium sodales. In sit amet urna tempor, egestas ligula nec, accumsan massa. "
    },
    {
        name : "Sunrise's hill",
        image : "https://images.unsplash.com/photo-1464207687429-7505649dae38?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a arcu at orci volutpat scelerisque quis sed mauris. Morbi suscipit odio pretium lorem bibendum, sit amet sagittis ante viverra. Aliquam euismod dui ullamcorper, ornare turpis eu, euismod est. Etiam sed nisl vitae ante fringilla congue vel vitae nisi. Suspendisse vel elit mollis, consequat urna eu, ornare diam. Quisque non ipsum a tortor ultrices pellentesque ut vitae nibh. Integer a mollis justo. In fermentum erat id dolor tempus, a commodo felis venenatis. Curabitur vitae cursus magna. Praesent in sem vel ante pretium sodales. In sit amet urna tempor, egestas ligula nec, accumsan massa. "
    }
]

function seedDB (){
    //Remove all campgrounds
    Campground.remove({},function(err){
    //     if(err){
    //         console.log(err);
    //     }
    //     else{
    //         console.log("camgrounds removed");
    //     }
    //     //add new campgrounds
    //     data.forEach(function(seed){
    //         Campground.create(seed,function(err,campground){
    //             if(err){
    //                 console.log(err);
    //             }
    //             else{
    //                 console.log("added new camp")
    //                 //add new comment
    //                 Comment.create({autho},function(err,comment){
    //                     if(err){
    //                         console.log(err);
    //                     }
    //                     else{
    //                         //add username and id to comment
    //                         comment.author.id= req.user._id;
    //                         comment.author.username = req.user.username;
    //                         comment.save();
    //                         campground.comments.push(comment);
    //                         campground.save();
    //                         console.log("Created new comment");
    //                     }
    //                 })
    //             }
    //         })
    //     })
    })
}
//Export
module.exports = seedDB;