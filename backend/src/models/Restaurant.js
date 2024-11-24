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
    description:{
        type:String
    }
});

module.exports = Mongoose.model("Restaurant",Restaurant);