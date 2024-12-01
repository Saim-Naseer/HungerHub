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
    phone:{
        type:Number
    },
    type:{
        type:String,
        default:"rider"
    }
});

module.exports = Mongoose.model("Rider",Rider);