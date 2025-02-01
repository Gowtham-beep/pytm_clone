import mongoose from "mongoose"
import {Account} from "../schema/Schema.js"

const getBalance=async(req,res)=>{
    const balance= await Account.findOne({
        userId:req.userId
    })
    if(!balance){
        return res.status(400).json({
            message:"Failed to get the Account balance"
        })
    }
    return res.status(200).json({
        message:"Balance fetched successfully",
        balance
    })

}

const transfer=async(req,res)=>{
    const{amount,to}=req.body
    if (!amount || amount <= 0) {
        return res.status(400).json({ message: "Invalid transfer amount" });
    }
    const session= await mongoose.startSession()
    session.startTransaction()

    const account= await Account.findOne({userId:req.userId}).session(session)
    
    if(!account|| account.balance<amount){
       await session.abortTransaction()
       session.endSession()
        return res.status(400).json({
            message:"Insufficient balance"
        })
    }
    const toAccount= await Account.findOne({userId:to}).session(session)
    
    if(!toAccount){
       await session.abortTransaction()
       session.endSession()
        return res.status(400).json({
            message:'User account not found'
        })

    }
    await Account.findOneAndUpdate(
        {userId:req.userId},
        {$inc:{balance:-amount}},
        {session,new:true}
    )
    await Account.findOneAndUpdate(
        {userId:to},
        {$inc:{balance:amount}},
        {session,new:true}
    )
    
    await session.commitTransaction()
    session.endSession()

   return res.status(200).json({
        message:`${amount}Rs Transaction successfull `,
        fromBalance:account.balance,
        toBalance:toAccount.balance
    })
}
export {getBalance,transfer}