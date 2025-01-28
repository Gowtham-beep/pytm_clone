import express from 'express'
import {Dbconnection} from "./db/db.js"
import cors from 'cors'
import 'dotenv/config'

const app= express()



app.use(cors())
app.use(express.json())
app.get("/",async(req,res)=>{
    res.send("Pytm Clone")
})
Dbconnection()

app.listen(process.env.PORT,()=>{
    console.log("server listening in port 3000")
})


