import mongoose from "mongoose";
import { string } from "zod";

const schema=mongoose.Schema
const ObjectId=schema.ObjectId

const userSchema= new schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        minlength:3,
        maxlength:30
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    firstName:{
        type:String,
        required:true,
        trim:true,
        maxlength:50
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
        maxlength:50
    }
})

const User=mongoose.model('userModel',userSchema)

export{User}