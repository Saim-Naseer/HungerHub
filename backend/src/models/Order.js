const Mongoose = require('mongoose')

const Order = Mongoose.Schema({
    Customer_id:{
        type:Number,
        required:true
    },
    Rider_id:{
        type:Number,
        default:-1
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
        default:0
    },
    completed:{
        type:Boolean,
        default:false
    },
    isPlaced:{
        type:Boolean,
        default:false
    },
    isReady:{
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