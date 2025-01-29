const errorHandler=(err,res,req,next)=>{
    console.log(err.stack)

    const statuscode=err.statuscode||500
    const message=err.message||'Internal server Error'

    res.status(statuscode).json({
        success:false,
        message,
        stack:process.env.NODE_ENV==="development"?err.stack:undefined,
    })
}

export{errorHandler}