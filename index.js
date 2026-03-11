import "./env.js"
import express from 'express'
import { connectMongoose } from "./src/config/mongoose.config.js"
import applicationError from "./src/middleware/applicationError.js"
import mongoose from "mongoose"
import { userRouter } from "./src/features/user/user.router.js"
const app = express()
app.use("/api/users",userRouter)
app.use((err,req,res,next)=>{
    console.log(err)
    if(err instanceof applicationError){
        return res.status(err.code).send(err.message)
    }
    if(err instanceof mongoose.Error.ValidationError){
        return res.status(err.code).send(err.message)
    }
})
app.listen(3000,()=>{
    console.log("Server is listening")
    connectMongoose()
})