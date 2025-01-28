import express from 'express'
import {Dbconnection} from "./db/db.js"
const app= express()

app.get("/",async(req,res)=>{
    res.send("Pytm Clone")
})
Dbconnection()

app.listen(3000,()=>{
    console.log("server listening in port 3000")
})


