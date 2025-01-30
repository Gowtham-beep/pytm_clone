import mongoose from "mongoose";

const schema=mongoose.Schema

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

const Accountschema= new schema({
    userId:{
        type:schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    balance:{
        type:Number,
        required:true
    }
})

const User=mongoose.model('User',userSchema)
const Account=mongoose.model('Account',Accountschema)

export{User,Account}