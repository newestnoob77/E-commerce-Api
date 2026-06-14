
import { cartModel } from "./cart.model.js";
import mongoose from "mongoose";
export default class CartRepository{

async findUserById(userId){
    return cartModel.aggregate([
        {$match:{userId:new mongoose.Types.ObjectId(userId)}},
        {$unwind:{path:"$items",preserveNullAndEmptyArrays: true}},
        {$lookup:{
            from:"products",
            localField:"items.productId",
            foreignField:"_id",
            as:"productDetails"
        }},
        {$unwind:{path:"$productDetails",preserveNullAndEmptyArrays: true}},
        {$addFields:{"items.totalPrice":{$multiply:["$items.quantity","$productDetails.price"]}}},
        {$group:{
            _id:"$_id",
            userId:{$first:"$userId"},
            items:{
                $push:{
                    productId:"$items.productId",
                    quanitity:"$items.quantity",
                    product:"$productDetails",
                    totalPrice:"$items.totalPrice"
                }
            },
            subtotal:{$sum:"$items.totalPrice"}
        }},
        {
            $addFields:{
                tax :{$multiply:["$subtotal",0.1]},
                grandTotal:{$add:["$subtotal",{$multiply:["$subtotal",0.1]}]}
            }
        }
    ]);
}
async create(userId){
const cart = new cartModel({userId,items:[]})
return cart.save()
}
async save(cart){
    return cart.save()
}
}