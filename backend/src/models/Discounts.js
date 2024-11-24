const Mongoose = require('mongoose')

const Discounts = Mongoose.Schema({
    Restaurant_id:{
        type:Number,
        required:true 
    },
    Item_id:{
        type:Number,
        required:true 
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