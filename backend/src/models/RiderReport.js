const Mongoose = reuire('mongoose')

const RiderReport = Mongoose.Schema({
    Customer_id:{
        type:Number,
        Reuired:True
    },
    Rider_id:{
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


module.exports = Mongoose.model("RiderReport",RiderReport)