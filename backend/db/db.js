import mongoose from 'mongoose'

const Dbconnection= async()=>{
    mongoose.connect('')
    .then(console.log("Database connected"))
}

export{Dbconnection}