const Mongoose = require('mongoose')

const Menu = Mongoose.Schema({
    Restaurant_id:{
        type:Number,
        required:true
    },
    Item_id:{
        type:Number,
        required:true 
    },
    name:{
        type:String,
        required:true 
    },
    price:{
        type:Number,
        required:true 
    },
    popular:{
        type:Boolean, 
        default:false
    }
})

module.exports = Mongoose.model("Menu",Menu)