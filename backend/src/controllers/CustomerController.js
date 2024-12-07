
const RestaurantModel = require('../models/Restaurant')
const CustomerModel = require('../models/Customer')
const MenuModel = require('../models/Menu')
const service = require("../services/CustomerServices")
const CounterServices = require("../services/CounterService")
const DiscountModel  = require("../models/Discounts")
const path = require("path");

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

            let msg

            console.log(req.body)
            const name = req.body.name
            const email = req.body.email
            const phone = req.body.phone
            const role = req.body.role

            const location = req.body.region
            const address = req.body.address

            const pwd = req.body.pwd
            const forget = req.body.forget

            if(role==="Customer")
            {
                const msg2 = await service.check_email(role,email)

                if(msg2==="Email already Exists")
                {
                    res.status(400).json({message:msg2})
                }
                else
                {
                    msg = await service.Signup_Customer(name,email,phone,location,address,pwd,forget)
                    const val = await service.FindUser(email, pwd)
                    res.status(200).json({message:msg,message2:val.Customer_id})
                }

            }
            else if (role === "Restaurant") {
                const image = req.files?.image; // Safely access req.files.image
                const cusine = req.body.cusine;
                const description = req.body.description;
            
                const msg2 = await service.check_email(role,email)

                if(msg2==="Email already Exists")
                {
                    res.status(400).json({message:msg2})
                }
                else
                {   
                    const image2 = await service.SaveImage(image)
                    msg = await service.Signup_Restaurant(name, email, phone, location, address, pwd, forget, image2, cusine, description);
                    const val = await service.FindUser(email, pwd);
                    res.status(200).json({message:msg,message2:val.Restaurant_id})
                }
            }            
            else if(role==="Rider")
            {
                const image = req.files.image

                const msg2 = await service.check_email(role,email)

                if(msg2==="Email already Exists")
                {
                    res.status(400).json({message:msg2})
                }
                else
                {   
                    const image2 = await service.SaveImage(image)
                    msg = await service.Signup_Rider(name, email, phone, location, address, pwd, forget, image2);
                    const val = await service.FindUser(email, pwd);
                    res.status(200).json({message:msg,message2:val.Rider_id})
                }
            }


        }catch(e){
            res.status(400).json({message:"not successfull"})
        }
    }
    
      

}