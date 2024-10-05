import User from "../models/User.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async(req,res)=>{
    const {
        firstName,
        lastName,
        location,
        email,
        password
    } = req.body;

    const salt = await bcrypt.genSalt();
    const hashedPassWord = await bcrypt.hash(password,salt);
        const newUser =  new User({
            firstName,
            lastName,
            location,
            email,
            password:hashedPassWord,
        })
       const SavedUser = await newUser.save();

        res.status(201).json(SavedUser);
    try {
    } catch (error) {
        res.status(404).json({msg:error.message})
    }
}

export const login = async(req,res)=>{
  try {
    const {
        email,
        password
    } = req.body;

    const user = await User.findOne({
        email:email
    });
    if(!user){
        res.status(403).json({msg:"cannot find User"})
    }

    const isMatch  = await bcrypt.compare(password,user.password);
    if(!isMatch) return res.status(400).json({msg:"INVALID PASSWORD"});


    const token = jwt.sign({id:user._id},process.env.SECREAT_KEY);
    res.status(200).json({token,user});
  } catch (error) {
        res.status(500).json({msg:error.message})
  }
}



// export const usersOrders = async(req,res)=>{
//     try {
//         const {id} =  req.params;
//         const user = await User.findById(id);
//         if(!user){
//             throw new Error('User not found');
//         }
//         const orders = await Order.find({userId:id});
//         return res.status(200).json(orders);
//     } catch (error) {
//         res.status(404).json({msg:error.message})
//     }
// }