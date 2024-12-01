const Mongoose = require('mongoose')

const RiderReport = Mongoose.Schema({
    Customer_id:{
        type:Number,
        Required:true
    },
    Rider_id:{
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


module.exports = Mongoose.model("RiderReport",RiderReport)