const Restaurants = require("../models/Restaurant")
const Customers = require("../models/Customer")

module.exports = {
    GetRestaurants: async(location) =>{
        return await Restaurants.find({location})
    },
    GetLocation: async(Customer_id) =>{
        const customer =  await Customers.findOne({Customer_id})
        return customer ? customer.location : null
    }

}