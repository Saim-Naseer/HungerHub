const Orders = require("../models/Order")
const service = require("../services/RiderServices")
const session = require("../Session")

module.exports = {
    GetActiveOrders: async (req, res) => {
        try{
            const restaurant = await service.get_active_orders(session.users["User"].id)
            await res.send(restaurant)
        }
        catch(e){
            res.send("No Restaurant found..")
        }
    }
}