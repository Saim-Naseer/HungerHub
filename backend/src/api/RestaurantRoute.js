const router = require('express').Router();
const RestaurantController = require('../controllers/RestaurantController');

module.exports = () => {
    //get menu
    router.get('/menu/:restaurantId', RestaurantController.GetMenu);

    //add item to menu
    router.post('/menu/:restaurantId', RestaurantController.AddMenuItem);

    //delete item from menu
    router.delete('/menu/:restaurantId/:itemId', RestaurantController.DeleteMenuItem);

    //edit item from menu
    router.put('/menu/:restaurantId/:itemId', RestaurantController.EditMenuItem);

    //get active order
    router.get('/active-orders/:restaurantId', RestaurantController.GetActiveOrders);

    //order done
    router.put('/orders/:orderId/ready', RestaurantController.SetOrderReady);

    //generate voucher
    router.post('/createDiscount', RestaurantController.createDiscountVoucher);
    //get reports
    router.get('/reports/:restaurantId', RestaurantController.getRestaurantReports);

   //router.post("/create",RestaurantController.Create);

    return router;
};
