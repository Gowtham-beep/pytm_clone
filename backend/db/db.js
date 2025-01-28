import mongoose from 'mongoose'

const Dbconnection= async()=>{
    mongoose.connect(process.env.DB_URL)
    .then(console.log("Database connected"))
}

export{Dbconnection}