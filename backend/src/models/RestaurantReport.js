const Mongoose = require('mongoose');

const RestaurantReport = Mongoose.Schema({
    Customer_id: {
        type: Number,
        required: true // Corrected typo here
    },
    Restaurant_id: {
        type: Number,
        required: true // Corrected typo here
    },
    Message: {
        type: String,
    },
    Reply: {
        type: String
    }
});

RestaurantReport.set("toJSON", {
    transform: (doc, ret) => {
        delete ret.__v; // Remove `__v`
        return ret;
    }
});

module.exports = Mongoose.model("RestaurantReport", RestaurantReport); // Corrected model name here
