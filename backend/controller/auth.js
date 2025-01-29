 import jwt from 'jsonwebtoken'
 import z, { string } from 'zod'
 import { user, user } from '../schema/userSchema.js'

 const signupBody=z.object({
  username:z.string().email(),
  firstName:z.string(),
  lastName:string(),
  password:string()
 })

 const signup = async(req, res) => {
    const{success}=signupBody.parse(req.body)
    if(!success){
      return res.status(411).json({
        message:"Email already taken/Incorrect inputs"
      })
    }
    const existUser= await user.findOne({
      username:req.body.username
    })
    if(existUser){
      return res.status(411).json({
        message:"Email already taken/Incorrect inputs"
      })
    }
    const user= await user.create({
      username:req.body.username,
      password:req.body.password,
      firstName:req.body.firstName,
      lastName:req.body.lastName
    })
    const token=jwt.sign({user},process.env.JWT_SECRET)

    return res.status(200).json({
      message:"User created successfully",
      user,
      token,
    })
  };
  
   const signin = (req, res) => {
    res.send("Signin logic here");
  };
  

  

export{signup,signin}