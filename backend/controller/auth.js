 import jwt from 'jsonwebtoken'
 import z from 'zod'
 import { User, Account} from '../schema/Schema.js'
 import bcrypt from 'bcrypt'

 const saltRounds=8
 const signupBody=z.object({
  username:z.string().email(),
  firstName:z.string(),
  lastName:z.string(),
  password:z.string()
 })

 const signup = async(req, res) => {
    
    const{success}=signupBody.safeParse(req.body)
    console.log(req.body)
    
    if(!success){
      return res.status(411).json({
        message:"Email already taken/Incorrect inputs"
      })
    }
    const existUser= await User.findOne({
      username:req.body.username
    })
    if(existUser){
      return res.status(411).json({
        message:"Email already taken/Incorrect inputs"
      })
    }
    
    const password= await bcrypt.hash(req.body.password,saltRounds)
    const user= await User.create({
      username:req.body.username,
      password:password,
      firstName:req.body.firstName,
      lastName:req.body.lastName
    })
    const userId=user._id
     await Account.create({
      userId:userId,
      balance:1+Math.random()*10000
     })
    
    return res.status(200).json({
      message:"User created successfully",
      user
    })
  };

   const signinBody= z.object({
    username:z.string().email(),
    password:z.string()
   })
  
  const signin =async (req, res) => {
   const {success}=signinBody.safeParse(req.body)
   if(!success){
    return res.status(411).json({
      message:"Email taken/ incorrect"
    })
   }
   const user= await User.findOne({
    username:req.body.username
   })
   if(!user){
    return res.status(400).json({
      message:"User not found"
    })
   }
   const password = await bcrypt.compare(req.body.password,user.password)
   if(!password){
    return res.status(411).json({
      message:"Password Incorrect"
    })
   }
   const token=jwt.sign({userId:user._id},process.env.JWT_SECRET)

   return res.status(200).json({
    message:"signin success",
    token
   })
};

export{signup,signin}