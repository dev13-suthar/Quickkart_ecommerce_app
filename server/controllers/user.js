import User from "../models/User.js";
import Product from "../models/Product.js"
import Order from  "../models/Order.js"
import {mongoose} from "mongoose"

export  const getUserInfo = async(req,res)=>{

        try {
            const {id} = req.params;
        const userInfo = await User.findById(id).select("-password");
        res.status(200).json(userInfo);
        } catch (error) {
            res.status(404).json({msg:"Cannot find User with"})
        }
}

export const addToWishList = async(req,res)=>{
    try {
        const {userId,id} = req.body;
        const user = await User.findById(userId);
       
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if(user.wishlist.includes(id)){
            return res.status(400).json({ error: 'Product already in wishlist' });
        }

        user.wishlist.push(id);
        await user.save();
        res.status(200).json({msg:"ok done"});
    } catch (error) {   
        res.status(404).json({msg:error.message})
    }
}

export const removeProductFromList = async(req,res)=>{
    try {
        const userId = req.params.userId;
        const productId = req.params.productId;

        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({err:"cannot find user"});
        }
        user.wishlist.pull(productId);
        await user.save();

        res.status(200).json({msg:"product removed from list"});
    } catch (error) {
        res.status(404).json({msg:error.message})
    }
}

export const addToCart = async(req,res)=>{
    const {userId,productId} = req.body;
    try {
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({msg:"Cannot find User"});
        }
        const productToAdd = await Product.findById(productId);
        if (!productToAdd) {
            return res.status(404).json({ msg: "Product not found" });
        }
        const isProductinCart = await user.cart.some(item=>item._id.equals(productId));
        if(isProductinCart){
            return res.status(400).json({msg:"Cannot add Product is Already there"})
        }
        user.cart.push(productToAdd);
        await user.save();
        res.status(200).json({msg:`Product added to Cart and this ${isProductinCart}`})
    } catch (error) {
        res.status(404).json({msg:error.message})
    }
}

export const removeFromCart = async(req,res)=>{
    const {userId,productId} = req.body;
    try {
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({msg:"Caanot find user"});
        }
        const product = await Product.findById(productId);
        if(!product){
            return res.status(404).json({msg:"Caanot find product with given id"});
        }
        user.cart.pull(product);
        await user.save();
        res.status(200).json({msg:"Product removed from Cart"})
    } catch (error) {
        res.status(404).json({msg:error.message})
    }
}

export const usersOrders = async(req,res)=>{
    try {
        const {id} =  req.params;
        const user = await User.findById(id);
        if (!user) {
            throw new Error('User not found');
        }
        const orders = await Order.aggregate([
            {
                $match: {
                    userId:  new mongoose.Types.ObjectId(id)
                }
            },
            {
                $lookup: {
                    from: 'orders',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'userOrders'
                }
            }
        ]);
        res.status(200).json({orders,user});
    } catch (error) {
        res.status(404).json({msg:error.message})
    }
}