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
await this.userRepository.signup(userData)   
return res.status(200).send(userData)
        }catch(err){

        }


}
    async signin(req,res,next){
    
    }
    async logout(req,res,next){

    }
    async logoutAllDeivce(req,res,next){

    }
}