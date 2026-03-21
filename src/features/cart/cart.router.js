import express from 'express'
import CartController from './cart.controller.js'
import {jwtAuth} from "../../middleware/jwt.middleware.js"
export const cartRouter = express.Router()
const cartController = new CartController()
cartRouter.get("/",jwtAuth,(req,res,next)=>{
cartController.viewCart(req,res,next)
})
cartRouter.post("/add",jwtAuth,(req,res,next)=>{
cartController.addProductToCart(req,res,next)
})
cartRouter.delete("/remove/:productId",jwtAuth,(req,res,next)=>{
    cartController.RemoveProductFromCart(req,res,next)
})
cartRouter.patch("/update",jwtAuth,(req,res,next)=>{
    cartController.updateQuanitiy(req,res,next)
})