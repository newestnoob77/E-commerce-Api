import { ReturnDocument } from "mongodb";
import { productModel } from "./product.model.js";
export default class ProductRepository{
async findAllProduct(query={}){
return await productModel.find(query)
}
async findProductById(productId){
return await productModel.findById(productId)
}
async createProduct(productData){
    const newProduct = new productModel(productData)
    await newProduct.save()
    return newProduct
}
async updateProduct(updateData,productId){
    const updatedProduct = await productModel.findByIdAndUpdate(productId,{$set:updateData},{new:true})
    return updatedProduct
}
async deleteProduct(productId){
    const deleteProduct = await productModel.findByIdAndDelete(productId)
    return deleteProduct
}
}