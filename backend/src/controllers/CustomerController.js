
const RestaurantModel = require('../models/Restaurant')
const CustomerModel = require('../models/Customer')
const MenuModel = require('../models/Menu')
const service = require("../services/CustomerServices")
const CounterServices = require("../services/CounterService")

module.exports = {
    Create: async (req,res) => {

        try{

            const counter = new CounterModel({
                collectionName:"RestaurantReport"
            })            

            await counter.save()

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
    },
    GetItems: async(req,res)=>{
        try{
            const Restaurant_id = Number(req.query.rid);

            const items = await service.GetItems(Restaurant_id)

            await res.send(items)
        }catch(e){
            res.send("not found")
        }
    },
    GetActiveOrder: async(req,res)=>{
        try{
            
            const Customer_id = req.query.uid

            const order = await service.GetActiveOrders(Customer_id)

            res.status(200).send(order)

        }catch(e){
            res.send("not done")
        }
    },
    AddToCart: async (req, res) => {
        try {
          const Customer_id = req.query.uid
          const Restaurant_id = req.query.rid
          const Item_id = req.query.iid
      
          let customerOrder = await service.GetActiveOrders(Customer_id)
      
          if (!customerOrder) { 
            customerOrder = await service.CreateOrder({ Customer_id })
          }
      

          await service.AddToCart({ customerOrder, Restaurant_id, Item_id })

          
          res.status(200).send("ok")
        
        } catch (e){
          res.status(400).send("not found")
        }
    },
    ViewCart: async(req,res) =>{
        try{
            const Customer_id = req.query.uid
            let customerOrder = await service.GetActiveOrders(Customer_id)

            const val = await service.GetCartItems(customerOrder)


            res.status(200).send(val)
        }catch(e){
            res.send("not done")
        }
    }
      

}