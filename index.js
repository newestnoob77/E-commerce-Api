import "./env.js"
import express from 'express'
import { connectMongoose } from "./src/config/mongoose.config.js"
const app = express()
app.get("/",(req,res,next)=>res.send("Server working"))
app.listen(3000,()=>{
    console.log("Server is listening")
    connectMongoose()
})