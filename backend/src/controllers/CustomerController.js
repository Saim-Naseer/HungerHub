
const RestaurantModel = require('../models/Restaurant')
const CustomerModel = require('../models/Customer')
const MenuModel = require('../models/Menu')
const service = require("../services/CustomerServices")
const CounterServices = require("../services/CounterService")
const DiscountModel  = require("../models/Discounts")

module.exports = {
    Create: async (req,res) => {

        try{

            await CustomerModel.findOneAndUpdate(
                {Customer_id:1},
                {type:"customer"},
                {new: true}
            )

            //await counter.save()

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
    },
    ViewDiscounts: async(req,res) =>{
        try{
            const Customer_id = req.query.uid
            let customerOrder = await service.GetActiveOrders(Customer_id)
            const val = await service.GetCartItems(customerOrder)

            const content = await service.GetDiscounts(val)

            res.send(content)
        }catch(e){
            res.send("not done")
        }
    },
    ApplyDiscount: async (req, res) => {
        try {
            const Customer_id = req.query.uid;
            const Restaurant_id = req.query.rid;
            const Discount_id = req.query.did;
    
            const customerOrder = await service.GetActiveOrders(Customer_id);
    
            const val = await service.ApplyDiscount({ Restaurant_id, Discount_id, customerOrder });
    
            res.status(200).send("ok") // Send JSON response
        } catch (e) {
            res.status(400).send("not found")// Send error as JSON
        }
    },
    GetPastOrders: async(req,res)=>{
        try{
            
            const Customer_id = req.query.uid

            const order = await service.GetPastOrders(Customer_id)

            res.status(200).send(order)

        }catch(e){
            res.send("not done")
        }
    },
    GetWaitingOrders: async(req,res)=>{
        try{
            
            const Customer_id = req.query.uid

            const order = await service.GetWaitingOrders(Customer_id)

            res.status(200).send(order)

        }catch(e){
            res.send("not done")
        }
    },
    FindUser: async (req, res) => {
        try {
            const email = req.query.email;
            const pwd = req.query.pwd; // Fix the typo here
    
            console.log("email", email);
            console.log("pwd", pwd);
    
            const val = await service.FindUser(email, pwd);
    
            if (val) {
                res.status(200).send(val);
            } else {
                res.status(404).send("User not found");
            } 
        } catch (e) {
            console.error("Error in FindUser:", e);
            res.status(500).send("Internal Server Error");
        }
    },
    Signup: async(req,res) =>{
        try{

        }catch(e){
            
        }
    }
    
      

}