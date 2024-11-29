const router = require('express').Router()
const CustomerController = require('../controllers/CustomerController')

module.exports = () => {
    
    router.post("/create",CustomerController.Create)
    router.get("/restaurants",CustomerController.GetRestaurants)
    router.get("/popularitems",CustomerController.GetPopularItems)
    return router
}

