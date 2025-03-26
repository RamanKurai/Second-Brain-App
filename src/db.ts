import mongoose  from "mongoose";
import { Schema } from "mongoose";
import { model } from "mongoose";

mongoose.connect("//Put Your Own String")

const userSchema = new Schema ({  
    email : ({type : String ,  required : true ,unique : true}),
    password : ({type : String  , required : true})
})

const contentSchema = new Schema ({
    title : String,
    link : String,
    tags : [{type : mongoose.Types.ObjectId , ref : "tag"}],
    type : String,
    userId : {type : mongoose.Types.ObjectId , ref : "users" , required : true}
})

const tagSchema = new Schema ({
    title : {type : String , required : true , unique : true}
})

const linkSchema = new Schema ({
  hash : {type : String  , required : true},
  userId : {type : mongoose.Types.ObjectId , ref: "users"}
})
export const userModel =  model("users" , userSchema)
export const contentModel = model("content" , contentSchema)
export const tagModel =   model("tag" , tagSchema)
export const linkModel =  model("link" ,linkSchema)

