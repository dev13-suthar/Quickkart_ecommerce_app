import mongoose from "mongoose";

const OrderSchema =  new mongoose.Schema({
    userId:{type:mongoose.Types.ObjectId,
            ref:'User'
    },
    customerId:{type:String},
    paymentIntentId:{type:String},
    products:[
        {
            id:{type:String},
            name:{type:String},
            company:{type:String},
            unitPrice:{type:String},
            cartQuantity:{type:Number},
            image:{type:String},
        },
    ],
    subTotal:{type:Number,required:true},
    total:{type:Number,required:true},
    Shipping:{type:Object,required:true},
    deliveryStatus:{type:String,default:"pending"},
    paymentStatus:{type:String,required:true},
},{timestamps:true})

const Order = mongoose.model('Order',OrderSchema);

export default Order;