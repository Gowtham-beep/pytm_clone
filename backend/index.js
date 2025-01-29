import express from 'express'
import {Dbconnection} from "./db/db.js"
import cors from 'cors'
import 'dotenv/config'
import router from './routes/index.js'
import {errorHandler} from './middlewares/globalErrorHandler.js'

const app= express()



app.use(cors())
app.use(express.json())

app.get("/",async(req,res)=>{
    res.send("Pytm Clone")
})

app.use("/api",router)
Dbconnection()
app.use(errorHandler)
app.listen(process.env.PORT,()=>{
    console.log("server listening in port 3000")
})


