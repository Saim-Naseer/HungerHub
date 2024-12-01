const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/AdminController');

module.exports = () => {
    // API route to get all restaurants
    router.get("/restaurants", AdminController.GetAllRestaurants);
    router.delete("/deleteRestaurant/:id", AdminController.DeleteRestaurant);
    router.get('/customers', AdminController.GetAllCustomers);
    router.delete('/deleteCustomer/:id', AdminController.DeleteCustomer);
    router.get('/riders', AdminController.GetAllRiders);
    router.delete('/deleteRider/:id', AdminController.DeleteRider);
    return router;
}
