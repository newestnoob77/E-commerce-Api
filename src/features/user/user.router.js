import express from "express";
import UserController from "./userController.js";
const userController = new UserController
export const userRouter = express.Router()
userRouter.post("/signup",(req,res,next)=>{
    userController.signup(req,res,next)
})