
const RestaurantModel = require('../models/Restaurant')
const CustomerModel = require('../models/Customer')
const service = require("../services/CustomerServices")

module.exports = {
    Create: async (req,res) => {

        try{

            const Customer = new CustomerModel({
                Customer_id:1,
                email:"saim@gmail.com",
                pwd:"1234",
                name:"Saim Naseer",
                location:"DHA Phases 1-8, Lahore Cantt, Walton"
            })
    
            await Customer.save()
    
            res.send("done")
    

        }catch(e){

            res.send("not done")
        }
    },
    GetRestaurants: async(req,res) =>{
        try{
            const Customer_id = req.query.uid;

            const location = await service.GetLocation(Customer_id)

            const restaurant = await service.GetRestaurants(location)

            await res.send(restaurant)

        }catch(e){
            res.send("not found")
        }
    }
}