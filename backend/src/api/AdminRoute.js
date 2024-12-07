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
    router.get('/restaurantReports', AdminController.GetRestaurantReportsWithEmptyReplies)
    router.put("/restaurantReports/:id/reply", AdminController.UpdateRestaurantReportReply);
    router.get('/riderReports', AdminController.GetRiderReportsWithEmptyReplies)
    router.put("/riderReports/:id/reply", AdminController.UpdateRiderReportReply);
    return router;
}
