var mongoose = require("mongoose");

//Create Comment Schema
var commentSchema = mongoose.Schema({
    text: String,
    author: {
        //referencing author with user
        id : {
            type:mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
})
//Export
module.exports = mongoose.model("Comment",commentSchema);