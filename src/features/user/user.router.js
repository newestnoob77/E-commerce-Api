import express from "express";
import UserController from "./userController.js";
import { jwtAuth } from "../../middleware/jwt.middleware.js";
const userController = new UserController
export const userRouter = express.Router()
userRouter.post("/signup",(req,res,next)=>{
    userController.signup(req,res,next)
})
userRouter.post("/signin",(req,res,next)=>{
    userController.signin(req,res,next)
})
userRouter.post("/logout",jwtAuth,(req,res,next)=>{
    userController.logout(req,res,next)
})
userRouter.post("logout-all-devices",jwtAuth,(req,res,next)=>{
    userController.logoutAllDeivce(req,res,next)
})