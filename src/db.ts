import mongoose, { mongo } from "mongoose";
import { Schema } from "mongoose";
import { ObjectId } from "mongoose";

const userSchema = new mongoose.Schema ({  
    email : ({type : String ,  required : true ,unique : true}),
    password : ({type : String  , required : true})
})

const contentSchema = new mongoose.Schema ({
    title : String,
    link : String,
    tags : [{type : mongoose.Types.ObjectId , ref : 'Tag'}],
    type : String,
    userId : {type : mongoose.Types.ObjectId , ref : "User" , required : true}
})

const tagSchema = new mongoose.Schema ({
    title : {type : String , required : true , unique : true}
})

const linkSchema = new mongoose.Schema ({
  hash : {type : String  , required : true},
  userId : {type : mongoose.Types.ObjectId , ref: "User"}
})

const userModel = mongoose.model("user" , userSchema)
const contentModel = mongoose.model("content" , contentSchema)
const tagModel = mongoose.model("tag" , tagSchema)
const linkModel = mongoose.model("link" ,linkSchema)

module.exports = {
 userModel : userModel,
 contentModel : contentModel,
 tagModel : tagModel,
 linkModel : linkModel
}


