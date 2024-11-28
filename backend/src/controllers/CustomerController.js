
const RestaurantModel = require('../models/Restaurant')
const CustomerModel = require('../models/Customer')
const service = require("../services/CustomerServices")

module.exports = {
    Create: async (req,res) => {

        try{

            const restaurant = await RestaurantModel.findOneAndUpdate(
                {Restaurant_id:1},
                {$set: {image:"/Images/chezious.jpg"}},
                {new:true}
            )
    
            await restaurant.save()
    
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