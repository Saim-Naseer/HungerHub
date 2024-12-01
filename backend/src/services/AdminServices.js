const RestaurantModel = require('../models/Restaurant');
const CustomerModel = require('../models/Customer')
const RiderModel = require('../models/Rider')

module.exports = {
    // Service to get all restaurants
    GetAllRestaurants: async () => {
        return await RestaurantModel.find();
    },
    GetAllCustomers: async () => {
        try {
            // Fetch all customers from the database
            return await CustomerModel.find({}, { pwd: 0 }); // Exclude the `pwd` field for security reasons
        } catch (error) {
            throw new Error('Unable to fetch customers:' + error.message);
        }
    },
    GetAllRiders: async () => {
        try {
            // Fetch all customers from the database
            return await RiderModel.find({}, { pwd: 0 }); // Exclude the `pwd` field for security reasons
        } catch (error) {
            throw new Error('Unable to fetch riders:' + error.message);
        }
    }
}
