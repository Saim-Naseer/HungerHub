const router = require('express').Router()
const RiderController = require('../controllers/RiderController')

module.exports = () => {

    router.get("/getActiveOrders", RiderController.GetActiveOrders)
    return router
}