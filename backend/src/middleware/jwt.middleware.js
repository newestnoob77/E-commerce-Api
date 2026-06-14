import jwt from "jsonwebtoken";
import { UserModel } from "../features/user/user.model.js";
export const jwtAuth=async(req,res,next)=>{
    const token =req.headers["authorization"];
    console.log(token);
    if(!token) return res.send("Unauthorized");
    try{
const payload = jwt.verify(token,process.env.JWT_SECRET)
const user = await UserModel.findOne({_id:payload.userId,tokens:token})
if(!user) return res.status(401).send("Unauthorized");
req.user=user;
req.token=token
next()
    
    }catch(err){
        console.log(err)
        return res.status(401).send("Unauthorized")
    }
}