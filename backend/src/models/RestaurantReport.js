const Mongoose = require('mongoose')

const RestaurantReport = Mongoose.Schema({
    Customer_id:{
        type:Number,
        Required:true
    },
    Restaurant_id:{
        type:Number,
        Required:true
    },
    Message:{
        type:String
    },
    Reply:{
        type:String
    }
})


module.exports = Mongoose.model("RestaurantReport",RestaurantReport)