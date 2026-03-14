import { UserModel } from "./user.model.js";
export default class UserRepository{
    async signup(userData){
       const newUser = new UserModel(userData);
       await newUser.save()
       return newUser
    }
    async findByEmail(email){
        return await UserModel.findOne({email})
    }
    async logout(userId,token){
        const user = await UserModel.findById(userId)
        user.tokens=user.tokens.filter(t=>t!==token)
        await user.save()
        return user
    }
    async logoutAllDeivce(userId){
        const user = await UserModel.findById(userId)
        user.tokens=[]
        await user.save()
        return user
    }
}