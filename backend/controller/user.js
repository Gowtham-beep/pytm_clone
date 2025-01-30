import { User } from "../schema/userSchema.js";
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
console.log(req.user._id)
const updateinfo= await User.findByIdAndUpdate({_id:req.user._id},req.body,{new:true,runValidators:true})
if(!updateinfo){
    return res.status(411).json({
        message:"Failed to update info"
    })
}
return res.status(200).json({
    message:"Update successful",
    updateinfo
})
}
export{updateinfo}