const mongoose=require('mongoose');
const {ObjectId}=mongoose.Schema;

const ProductCartSchema=new mongoose.Schema({
    products:{
        type:ObjectId,
        ref:"Product"
    },
    name:String,
    count:Number,
    price:Number,
})

const ProductCart=mongoose.model("ProductCart",ProductCartSchema)

const orderSchema=new mongoose.Schema({
    products:[ProductCartSchema],
    transaction_id:{},
    amount:{
        type:Number,
        required:true
    },
    addrress:{
        type:String,
        maxlength:1500,
        required:true
    },
    updated:Date,
    user:{
        type:ObjectId,
        ref:"User",
    },
},{timestamps:true})

const order=mongoose.model("Order",orderSchema);

module.exports ={orderSchema,ProductCart}