const router = require('express').Router()
const RiderController = require('../controllers/RiderController')

module.exports = () => {

    // this gives order summary
    router.get('/getActiveOrders/:riderId', RiderController.GetActiveOrders)
    // this gives order detail
    router.get('/getOrderDetails/:orderId', RiderController.GetOrderDetails)
  
    router.get('/orders-history/:riderId', RiderController.getOrdersHistory)

    router.put('/updateRiderInfo', RiderController.updateRiderInfo)

    router.use('/riderReports/:riderId', RiderController.getRiderReports)

    router.get('/new-orders/:riderLocation', RiderController.getNewOrders);

    router.put('/set-rider/:orderId/:riderId', RiderController.setRider);

    router.put('/complete-order/:orderId', RiderController.completeOrder);

    router.get('/get-rider-info/:riderId', RiderController.getRiderInfo);

    

    return router

}