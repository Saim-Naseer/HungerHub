const RestaurantModel = require('../models/Restaurant');
const CustomerModel = require('../models/Customer')
const RiderModel = require('../models/Rider')
const AdminService = require('../services/AdminServices')

module.exports = {
    // Get all restaurants for the admin panel
    GetAllRestaurants: async (req, res) => {
        try {
            const restaurants = await RestaurantModel.find();
            res.status(200).json(restaurants);
        } catch (e) {
            console.error(e);
            res.status(500).send("Error fetching restaurants");
        }
    },
    GetAllCustomers: async (req, res) => {
        try {
            const customers = await AdminService.GetAllCustomers();
            res.status(200).json(customers); // Respond with the list of customers
        } catch (error) {
            res.status(500).json({ message: 'Failed to fetch customers', error: error.message });
        }
    },
    GetAllRiders: async (req, res) => {
        try {
            const riders = await AdminService.GetAllRiders();
            res.status(200).json(riders); // Respond with the list of customers
        } catch (error) {
            res.status(500).json({ message: 'Failed to fetch riders', error: error.message });
        }
    },
    DeleteRestaurant: async (req, res) => {
        try {
            const restaurantId = req.params.id;

            // Check if restaurant exists
            const restaurant = await RestaurantModel.findOne({ Restaurant_id: restaurantId });
            if (!restaurant) {
                return res.status(404).send({ message: "Restaurant not found" });
            }

            // Delete the restaurant
            await RestaurantModel.deleteOne({ Restaurant_id: restaurantId });
            res.status(200).send({ message: "Restaurant deleted successfully" });
        } catch (error) {
            console.error("Error deleting restaurant:", error);
            res.status(500).send({ message: "An error occurred while deleting the restaurant" });
        }
    },
    DeleteCustomer: async (req, res) => {
        try {
            const { id } = req.params;  // Extract Customer_id from the request params

            // Try to find and delete the customer
            const deletedCustomer = await CustomerModel.findOneAndDelete({ Customer_id: id });

            if (!deletedCustomer) {
                return res.status(404).json({ message: "Customer not found" });
            }

            res.status(200).json({ message: "Customer deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: "Error deleting customer", error: error.message });
        }
    },
    DeleteRider: async (req, res) => {
        try {
            const { id } = req.params;  // Extract Customer_id from the request params

            // Try to find and delete the customer
            const deletedRider = await RiderModel.findOneAndDelete({ Rider_id: id });

            if (!deletedRider) {
                return res.status(404).json({ message: "Rider not found" });
            }

            res.status(200).json({ message: "Rider deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: "Error deleting Rider", error: error.message });
        }
    }
}
