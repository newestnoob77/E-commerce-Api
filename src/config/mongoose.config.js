import mongoose from "mongoose";
export const connectMongoose = async()=>{
    try{
        console.log(process.env.DB_URL)
await mongoose.connect(process.env.DB_URL);
console.log("Connected to mongodb using mongoose");
    }
    catch(err){
console.log(err)
    }
}