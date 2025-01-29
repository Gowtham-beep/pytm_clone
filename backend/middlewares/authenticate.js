import jwt from 'jsonwebtoken'

const Authenticate=async(req,res,next)=>{
try{ const authHeader= req.headers.authorization
if(!authHeader||!authHeader.startsWith('Bearer')){
    return res.status(401).json({
        message:"Uauthorized:No token provided"
    })
}
const token=authHeader.split(' ')[1]
const decoded =jwt.verify(token,process.env.JWT_SECRET)
req.user=decoded
next()
}catch(error){
    return res.status(500).json({
        message:error.message
    })
}
}
export default Authenticate