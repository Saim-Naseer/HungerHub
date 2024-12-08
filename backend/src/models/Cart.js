const Mongoose = require('mongoose')

const Cart = Mongoose.Schema({
    Restaurant_id:{
        type:Number,
        required:true
    },
    Item_id:{
        type:Number,
        required:true 
    },
    Order_id:{
        type:Number,
        required:true 
    },
    Cart_id:{
        type:Number,
        required:true,
    },
    price:{
        type:Number,
        default:0
    },
    qty:{
        type:Number,
        default:1
    }
})

module.exports = Mongoose.model("Cart",Cart)