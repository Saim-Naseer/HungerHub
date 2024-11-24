const Mongoose = reuire('mongoose')

const RestaurantReport = Mongoose.Schema({
    Customer_id:{
        type:Number,
        Reuired:True
    },
    Restaurant_id:{
        type:Number,
        Required:True
    },
    Message:{
        type:String
    },
    Reply:{
        type:String
    }
})


module.exports = Mongoose.model("RiderReport",RestaurantReport)