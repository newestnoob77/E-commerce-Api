import applicationError from "../../middleware/applicationError.js";
import UserRepository from "./user.repository.js";
import bcrypt from 'bcrypt'
export default class UserController{
    constructor(){
this.userRepository = new UserRepository
    }
   
    async signup(req,res,next){
        try{
const {name,email,password}=req.body
const passwordRegex = /^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/;
if (!passwordRegex.test(password)) {
    return res.status(400).send("Password should be 8–12 characters long and include at least one special character")
}
const hashedPassword = await bcrypt.hash(password,12)
const userData={name,email,password:hashedPassword}
const newUser=await this.userRepository.signup(userData)   
if(!newUser)return res.status(400).send("User not found");
return res.status(200).send(newUser)
}catch(err){
console.log(err)
throw new applicationError("Something went wrong")
        }
}
    async signin(req,res,next){
    
    }
    async logout(req,res,next){

    }
    async logoutAllDeivce(req,res,next){

    }
}