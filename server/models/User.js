import mongoose, { Schema } from "mongoose"

const UserSchema = new mongoose.Schema(
    {
        firstName:{
            type:String,
            required:true,
            min:2,
            max:50
        },
        lastName:{
            type:String,
            required:true,
            min:2,
            max:50
        },
        email:{
            type:String,
            required:true,
            max:50,
            unique:true
        },
        password:{
            type:String,
            required:true,
            min:6,
        },
        location:{
            type:String,
            required:true,
            max:40
        },
        orders:{
            type:[{type:Schema.Types.ObjectId, ref:'Order'}],
            default:[]
        },
        cart:{
           type:Array,
           default:[],
        },
        wishlist:{
            type: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
            default:[]
        }
    },
    {timestamps:true}
);

const User = mongoose.model("User",UserSchema);
export default User;

