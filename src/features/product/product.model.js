import { MongoTopologyClosedError } from "mongodb";
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{type:String,required:true,trim:true},
    description:{type:String,trim:true},
    image:{type:String,required:true},
    price:{type:Number,required:true,min:0},
    stock:{type:Number,required:true,min:0,default:0},
    category:{type:String,required:true,trim:true},
},{timestamps:true});
export const productModel =  mongoose.model("Product",productSchema)