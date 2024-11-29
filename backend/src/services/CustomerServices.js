const Restaurants = require("../models/Restaurant")
const Customers = require("../models/Customer")
const Menu = require("../models/Menu")

module.exports = {
    GetRestaurants: async(location) =>{
        return await Restaurants.find({location})
    },
    GetLocation: async(Customer_id) =>{
        const customer =  await Customers.findOne({Customer_id})
        return customer ? customer.location : null
    },
    GetPopularItems: async(Restaurant_id) =>{
        return await Menu.find({Restaurant_id,popular:true})
    }

}