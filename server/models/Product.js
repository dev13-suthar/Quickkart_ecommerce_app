import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ProductSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        },
        description:{
            type:String,
            min:2,
            max:50,
            required:true,
        },
        price:{
            type:Number,
            required:true
        },
        rating:{
            type:Number,
            default:0
        },
        newArrival:{
            type:Boolean,
            default:false
        },
        company:{
            type:String,
        },
        category: { type: Schema.Types.ObjectId, ref: 'Category' },
        images:[{type:String,required:true}],
    },
    {timestamps:true}
);

const Product = mongoose.model("Product",ProductSchema);
export default Product;