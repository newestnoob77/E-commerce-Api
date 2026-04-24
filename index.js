import "./env.js"
import express from 'express'
import { connectMongoose } from "./src/config/mongoose.config.js"
import applicationError from "./src/middleware/applicationError.js"
import { productRouter } from "./src/features/product/product.router.js"
import mongoose from "mongoose"
import { userRouter } from "./src/features/user/user.router.js"
import { cartRouter } from "./src/features/cart/cart.router.js"
const app = express()
app.use(express.json())
app.use("/api/users",userRouter)
app.use("/api/product",productRouter)
app.use("/api/cart",cartRouter);
app.use((err,req,res,next)=>{
    console.log(err)
    if(err instanceof applicationError){
        return res.status(err.code).send(err.message)
    }
    if(err instanceof mongoose.Error.ValidationError){
        return res.status(err.code).send(err.message)
    }
})
app.listen(5000,()=>{
    console.log("Server is listening")
    connectMongoose()
})