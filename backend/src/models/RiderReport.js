const Mongoose = require('mongoose')

const RiderReport = Mongoose.Schema({
    Customer_id:{
        type:Number,
        required:true
    },
    Rider_id:{
        type:Number,
        required:true
    },
    Message:{
        type:String
    },
    Reply:{
        type:String
    }
})


module.exports = Mongoose.model("RiderReport",RiderReport)