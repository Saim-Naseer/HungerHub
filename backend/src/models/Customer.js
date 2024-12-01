const Mongoose = require('mongoose')


const Customer = Mongoose.Schema({
    Customer_id: {
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
    image:{
        type:String
    },
    exact_address:{
        type:String
    }
});

module.exports = Mongoose.model("Customer",Customer);