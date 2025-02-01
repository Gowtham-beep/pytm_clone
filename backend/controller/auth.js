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
    
    const hashedPassword= await bcrypt.hash(req.body.password,saltRounds)
    const user= await User.create({
      username:req.body.username,
      password:hashedPassword,
      firstName:req.body.firstName,
      lastName:req.body.lastName
    })
    const userId=user._id
     await Account.create({
      userId:userId,
      balance:1+Math.random()*10000
     })
    
     const {password,...userWithoutPassword}=user.toObject()
    return res.status(200).json({
      message:"User created successfully",
      userWithoutPassword
    })
  };

   const signinBody= z.object({
    username:z.string().email(),
    password:z.string()
   })
  
   const signin = async (req, res) => {
    const parsed = signinBody.safeParse(req.body);
    
    if (!parsed.success) {
      return res.status(400).json({ 
        message: "Invalid input", 
        errors: parsed.error.format() 
      });
    }
  
    const { username, password } = parsed.data;
  
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
   
  
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Incorrect password" });
    }
  
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: "JWT secret not set in environment" });
    }
  
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  
    return res.status(200).json({ 
      message: "Signin successful", 
      token 
    });
  };
  

export{signup,signin}