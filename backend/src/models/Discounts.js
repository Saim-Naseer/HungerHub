const Mongoose = require('mongoose')

const Discounts = Mongoose.Schema({
    Discount_id:{
        type:Number,
        required:true
    },
    Restaurant_id:{
        type:Number,
        required:true 
    },
    name:{
        type:String
    },
    cap:{
        type:Number
    },
    percentage:{
        type:Number,
        required:true
    }
})

module.exports  = Mongoose.model("Discounts",Discounts)