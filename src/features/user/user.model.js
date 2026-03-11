import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true,match:[/.+\@.+\..+/,"Please enter a valid email"]},
    password:{type:String,required:true},
    tokens:{type:[String],default:[]}
},{timestamps:true});
export const UserModel=mongoose.model("User",UserSchema)