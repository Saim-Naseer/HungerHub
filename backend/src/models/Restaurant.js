const Mongoose = require('mongoose')


const Restaurant = Mongoose.Schema({
    Restaurant_id: {
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
    cusine:{
        type:String,
        required:true
    },
    exact_address:{
        type:String,
    },
    description:{
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
    image:{
        type:String
    },
    phone:{
        type:Number
    },
    type:{
        type:String,
        default:"restaurant"
    },
    forget_pwd:{
        type:String
    }, 
    
});

module.exports = Mongoose.model("Restaurant",Restaurant);