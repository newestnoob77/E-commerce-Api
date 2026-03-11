import mongoose from "mongoose";
export const connectMongoose = async()=>{
    try{
await mongoose.connect(process.env.DB_URL);
console.log("Connected to mongodb using mongoose");
    }
    catch(err){
console.log(err)
    }
}