import CartRepository from "./cart.repository.js";
import applicationError from "../../middleware/applicationError.js";
import { cartModel } from "./cart.model.js";
export default class CartController{
    constructor(){
        this.cartRepository  = new CartRepository()
    }
    async viewCart(req,res,next){
try{
const cart = await this.cartRepository.findUserById(req.user.id);
return res.json(cart[0]||{items:[],subtotal:0,taxt:0,grandTotal:0});
}
catch(err){
res.status(500).json({message:"Erro fetching cart"});
}
    }
     
    async addProductToCart(req,res,next){

const {productId,quantity}=req.body;
try{
    console.log(req.user.id)
let cart = await cartModel.findOne({userId:req.user.id});
if(!cart) cart = await this.cartRepository.create(req.user.id)
const exsistingItem=cart.items.find(item=>item.productId.equals(productId));
if(exsistingItem){
    exsistingItem.quantity+=quantity||1;
}
else{
    cart.items.push({productId,quantity:quantity || 1});
}
await this.cartRepository.save(cart)
const updatedCart = await this.cartRepository.findUserById(req.user.id)
if(!updatedCart) return res.status(400).send("Error adding product");
return res.status(201).json(updatedCart[0])
}
catch(err){
    console.log(err)
    throw new applicationError("something went wrong")
}
        
    }
    async RemoveProductFromCart(req,res,next){
try{
const cart  = await cartModel.findOne({userId:req.user.id})
if(!cart) return res.status(404).json({message:"Cart not found"});
cart.items=cart.items.filter(item=>!item.productId.equals(req.params.productId))
await this.cartRepository.save(cart)
const updatedCart = await this.cartRepository.findUserById(req.user.id)
if(!updatedCart) return res.status(404).send("Error removing product");
return res.status(200).send(updatedCart[0]);
}
catch(err){
    console.log(err)
    throw new applicationError("Something went wrong")
}
    }
async updateQuanitiy(req,res){
    const {productId,quantity} = req.body;
    try{
        
const cart = await cartModel.findOne({userId:req.user.id})
if(!cart) return res.status(404).json({message:"Cart not found"});
const item = cart.items.find(i=>i.productId.equals(productId))
if(!item) return res.status(404).json({message:"Product not in cart"});
item.quantity=quantity;
await this.cartRepository.save(cart)
const updatedCart = await this.cartRepository.findUserById(req.user.id);
if(!updatedCart) return res.status(400).send("Error updating successfully")
res.status(200).json(updatedCart[0])
    }
    catch(err){
        console.log(err)
        throw new applicationError("Something went wrong")
    }
}

}