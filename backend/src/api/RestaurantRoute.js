const express = require("express");
const router = express.Router();
const RestaurantController = require("../controllers/RestaurantController");

module.exports = () => {
    // Get menu
    router.get('/menu', RestaurantController.GetMenu);

    // Add item to menu
    router.post('/menu', RestaurantController.AddMenuItem);

    // Delete item from menu
    router.delete('/menu', RestaurantController.DeleteMenuItem);

    // Edit item in menu
    //router.put('/menu', RestaurantController.EditMenuItem);

    // Get active orders
    router.get('/active-orders', RestaurantController.GetActiveOrders);

    // Mark order as ready
    router.put('/orders/ready', RestaurantController.SetOrderReady);

    // Generate discount voucher
    router.post('/createDiscount', RestaurantController.createDiscountVoucher);

    // Get reports
    router.get('/reports', RestaurantController.getRestaurantReports);

    return router;
};
