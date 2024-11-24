const Mongoose = require('mongoose')

const Order = Mongoose.Schema({
    Customer_id:{
        type:Number,
        required:true
    },
    Rider_id:{
        type:Number,
        required:true
    },
    Order_id:{
        type:Number,
        required:true
    },
    Cart_id:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    completed:{
        type:Boolean,
        default:false
    },
    Takeaway:{
        type:Boolean,
        default:false
    },
    Delivery:{
        type:Boolean,
        default:false
    },
    COD:{
        type:Boolean,
        default:false
    },
    ATM:{
        type:Boolean,
        default:false
    }
})

module.exports = Mongoose.model("Order",Order)