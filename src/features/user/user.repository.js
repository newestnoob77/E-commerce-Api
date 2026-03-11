import { UserModel } from "./user.model.js";
export default class UserRepository{
    async signup(userData){
const newUser = new UserModel(userData);
await newUser.save()
return newUser
    }
    async signin(){

    }
    async logout(){

    }
    async logoutAllDeivce(){
        
    }
}