const Orders = require("../models/Order")
const Cart = require("../models/Cart")
const Counter = require("../models/Counter")
const Customer = require("../models/Customer")
const Restaurant = require("../models/Restaurant")
const Rider = require("../models/Rider")
const RiderReport = require("../models/RiderReport")


module.exports = {
    get_active_orders: async(userId) => {
        return await Orders.find({
            $and: [
                {Rider_id: userId},
                {completed: false}
            ]
        });
    },

};