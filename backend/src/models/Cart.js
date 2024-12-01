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
        unique:true
    },
    price:{
        type:Number,
        required:true 
    },
    qty:{
        type:Number,
        required:true
    }
})

module.exports = Mongoose.model("Cart",Cart)