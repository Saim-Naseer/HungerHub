const Mongoose = require('mongoose')


const Rider = Mongoose.Schema({
    Rider_id: {
        type: Number,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    pwd:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    image:{
        type:String
    },
    total_stars:{
        type:Number,
        default:0
    },
    total_ratings:{
        type:Number,
        default:0
    },
    phone:{
        type:Number
    },
    type:{
        type:String,
        default:"rider"
    }

});

module.exports = Mongoose.model("Rider",Rider);