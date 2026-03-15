import applicationError from "../../middleware/applicationError.js";
import ProductRepository from "./product.repository.js";

export class ProductController{
    constructor(){
this.productRepository= new ProductRepository()
    }
async getProducts(req,res,next){
try{
const result = await this.productRepository.findAllProduct(req.query);
if(!result) return res.status(400).send("No Product found");
return res.status(200).send(result)
}
catch(err){
    console.log(err)
    throw new applicationError("Something went wrong")
}
}
async getProductById(req,res,next){
try{
const {productId}=req.params.productId
const result = await this.productRepository.findProductById(productId);
if(!result) return res.status(200).send("Product not found");
return res.statu(200).send(result)
}
catch(err){
    console.log(err)
    throw new applicationError("Something went wrong")
}
}

// --------------------Admin crud opeartions-------------------------------

async createProduct(req,res,next){
    try{
const {name,description,image,price,stock,category}=req.body
const productData={name,description,image,price,stock,category}
console.log(productData)
const result = await this.productRepository.createProduct(productData);
if(!result ) return res.status(400).send("Product not been created");
return res.status(200).send(result)
    }
    catch(err){
        console.log(err)
        throw new applicationError("Something went wrong")
    }
}
async updateProduct(req,res,next){
    try{
const productId=req.params.productId
const result = await this.productRepository.updateProduct(req.body,productId)
if(!result) return res.status(404).send("Update failed")
return res.status(200).send(result)
    }
    catch(err){
        console.log(err)
        throw new applicationError("Something went wrong")
    }
}
async deleteProduct(req,res,next){
    try{
const result = await this.productRepository.deleteProduct(req.params.productId);
if(!result) return res.status(404).send("Deletion failed");
return res.status(200).send("Deleted Successfully")
    }
    catch(err){
        console.log(err)
        throw new applicationError("Something went wrong")
    }
}

}