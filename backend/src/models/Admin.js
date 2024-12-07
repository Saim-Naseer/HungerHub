const Mongoose = require('mongoose')

const Admin = Mongoose.Schema({
    Admin_id: {
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
    type:{
        type:String,
        default:"admin"
    },
    forget_pwd:{
        type:String
    }
})

module.exports = Mongoose.model("Admin",Admin)