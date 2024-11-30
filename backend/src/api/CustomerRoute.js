const router = require('express').Router()
const CustomerController = require('../controllers/CustomerController')

module.exports = () => {
    
    router.post("/create",CustomerController.Create)
    router.get("/restaurants",CustomerController.GetRestaurants)
    router.get("/popularitems",CustomerController.GetPopularItems)
    router.get("/items",CustomerController.GetItems)
    router.post("/addtocart",CustomerController.AddToCart)
    router.get("/cart",CustomerController.ViewCart)
    router.get("/activeorder",CustomerController.GetActiveOrder)
    return router
}

