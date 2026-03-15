import express from 'express';
import { ProductController } from './product.controller.js'; 
import { jwtAuth } from '../../middleware/jwt.middleware.js';
import { isAdmin } from '../../middleware/admin.middleware.js';
export const productRouter = express.Router()
const productController = new ProductController()
productRouter.get("/",(req,res,next)=>{
productController.getProducts(req,res,next)
})
productRouter.get("/:productId",(req,res,next)=>{
productController.getProductById(req,res,next)
})
// --------------------Admin crud opeartions router-------------------------------
productRouter.post("/admin/createProduct",jwtAuth,isAdmin,(req,res,next)=>{
    productController.createProduct(req,res,next)
})
productRouter.put("/admin/:productId",jwtAuth,isAdmin,(req,res,next)=>{
    productController.updateProduct(req,res,next)
})
productRouter.delete("/admin/:productId",jwtAuth,isAdmin,(req,res,next)=>{
    productController.deleteProduct(req,res,next)
})