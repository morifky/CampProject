var mongoose = require("mongoose");
//Create Schema
var campgroundSchema = mongoose.Schema({
    name: String,
    image: String,
    description: String,
    //save the author when creating new campground
    author:{
        id: {type:mongoose.Schema.Types.ObjectId,ref:"User"},
        username:String
    },
    //Object referencing
    comments: [{type:mongoose.Schema.Types.ObjectId,ref:"Comment"}]
});
module.exports = mongoose.model("Campground",campgroundSchema);