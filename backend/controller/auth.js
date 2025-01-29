 import jwt from 'jsonwebtoken'
 import z from 'zod'

 const signup = (req, res) => {
    const {username,password,firstName,lastName}=req?.body

  };
  
   const signin = (req, res) => {
    res.send("Signin logic here");
  };
  

  

export{signup,signin}