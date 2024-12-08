const router = require('express').Router()
const CustomerController = require('../controllers/CustomerController')

module.exports = () => {
    
    router.post("/create",CustomerController.Create)
    router.get("/signin",CustomerController.FindUser)
    router.get("/restaurants",CustomerController.GetRestaurants)
    router.get("/popularitems",CustomerController.GetPopularItems)
    router.get("/items",CustomerController.GetItems)
    router.post("/addtocart",CustomerController.AddToCart)
    router.get("/cart",CustomerController.ViewCart)
    router.get("/activeorder",CustomerController.GetActiveOrder)
    router.get("/pastorders",CustomerController.GetPastOrders)
    router.get("/waitingorder",CustomerController.GetWaitingOrders)
    router.get("/discounts",CustomerController.ViewDiscounts)
    router.post("/applydiscount",CustomerController.ApplyDiscount)
    router.get("/restaurantreports", CustomerController.GetRestaurantReports);
    router.get("/riderreports", CustomerController.GetRiderReports);
    return router
}

