const router = require('express').Router();
const RestaurantController = require('../controllers/RestaurantController');

module.exports = () => {
    router.get('/menu/:restaurantId', RestaurantController.GetMenu);

    router.delete('/menu/:restaurantId/:itemId', RestaurantController.DeleteMenuItem);

    return router;
};
