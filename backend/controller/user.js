import { User } from "../schema/Schema.js";
import z from 'zod'
const userBody=z.object({
    password:z.string().optional(),
    firstName:z.string().optional(),
    lastName:z.string().optional()
})

const updateinfo=async(req,res)=>{
const {success}=userBody.safeParse(req.body)
if(!success){
    return res.status(411).json({
        message:"Error while updating Information"
    })
}

const updateinfo= await User.findByIdAndUpdate(req.userId,req.body,{new:true,runValidators:true})
if(!updateinfo){
    return res.status(411).json({
        message:"Failed to update info"
    })
}
const {password,...updateinfoWithoutPassword}=updateinfo.toObject()
return res.status(200).json({
    message:"Update successful",
    updateinfoWithoutPassword
})
}

const getuserbynames=async(req,res)=>{
    const {firstName,lastName}=req.query
    
    let filter={}
    if(firstName){
        filter.firstName={
            $regex:firstName,$options:"i"
        }
    }
    if(lastName){
        filter.lastName={
            $regex:lastName,$options:"i"
        }
    }
    const users= await User.find(filter).select('-password')
    if(!users ){
        return res.status(400).json({
            message:"Failed to fetch the user"
        })
    }
    if(users.length===0 ){
        return res.status(400).json({
            message:"user dose not exits"
        })
    }
    
    return res.status(200).json({
        message:"User fetched successfully",
        users
    })
}

const getProfile=async(req,res)=>{
    const me= await User.findOne({_id:req.userId})
    console.log()
    if(!me){
        return res.status(400).json({
            message:"Failed to fetch user data"
        })
    }
    return res.status(200).json({
        message:"user Fetched successfully",
        me
    })
}

const getAllUsers=async(req,res)=>{
    const users= await User.find()
    if(!users){
        return res.status(400).json({
            message:"Failed to fetch users",
        })
    }
    return res.status(200).json({
        message:"users fetched successfully",
        users
    })
}

export{updateinfo,getuserbynames,getProfile,getAllUsers}