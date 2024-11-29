
const RestaurantModel = require('../models/Restaurant')
const CustomerModel = require('../models/Customer')
const MenuModel = require('../models/Menu')
const service = require("../services/CustomerServices")

module.exports = {
    Create: async (req,res) => {

        try{

            const item = new MenuModel({
                Restaurant_id:1,
                Item_id:1,
                name:"Crown Crust",
                price:1800,
                popular:true
            })
    
            await item.save()

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
    },
    GetPopularItems: async(req,res)=>{
        try{
            const Restaurant_id = Number(req.query.rid);

            const items = await service.GetPopularItems(Restaurant_id)

            await res.send(items)
        }catch(e){
            res.send("not found")
        }
    }
}