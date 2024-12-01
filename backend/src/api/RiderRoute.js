const router = require('express').Router()
const RiderController = require('../controllers/RiderController')

module.exports = () => {

    // this gives order summary
    router.get('/getActiveOrders', RiderController.GetActiveOrders)
    // this gives order detail
    router.get('/getOrderDetails', RiderController.GetOrderDetails)
  
    router.get('/orders-history', RiderController.getOrdersHistory)

    router.put('/updateRiderInfo', RiderController.updateRiderInfo)

    router.use('/riderReports', RiderController.getRiderReports)

    router.get('/new-orders', RiderController.getNewOrders);

    router.put('/set-rider/:orderId', RiderController.setRider);

    return router

}