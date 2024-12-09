
const RestaurantModel = require('../models/Restaurant')
const CustomerModel = require('../models/Customer')
const MenuModel = require('../models/Menu')
const service = require("../services/CustomerServices")
const CounterServices = require("../services/CounterService")
const DiscountModel  = require("../models/Discounts")
const path = require("path");
const utils = require("../utils/utils")
const RestaurantReportModel = require("../models/RestaurantReport")
const CartModel = require("../models/Cart")
const AdminModel = require("../models/Admin")


module.exports = { 
    Create: async (req,res) => {

        try{

            const val = await AdminModel({
                Admin_id:1,
                email:"ebaad@gmail.com",
                pwd:"1234",
                name:"ebaad",
                forget_pwd:"Lassi"
            })

            await val.save()

            res.send("done")

        }catch(e){ 

            res.send("not done")
        }
    },
    UpdateInfo: async(req,res) =>{
        try{
            const Customer_id = req.query.uid
            const name = req.query.name
            const email = req.query.email
            const phone = req.query.phone
            const address = req.query.phone
            const location = req.query.region

            await service.UpdateUser(Customer_id,name,email,phone,address,location)

            res.status(200).send({msg:"done"})
        }catch(e){
            res.status(400).send({msg:"not done"+e})
        }
    },
    GetRestaurants: async(req,res) =>{
        try{
            const Customer_id = req.query.uid;

            const location = await service.GetLocation(Customer_id)

            const restaurant = await service.GetRestaurants(location)

            await res.send(restaurant)

        }catch(e){
            res.status(400).send({msg:"not found"})
        }
    },
    FindRestaurant: async(req,res) =>{
        try{
            const Order_id = req.query.oid
            const Customer_id = req.query.uid

            const order = await service.FindOrder(Order_id,Customer_id)

            const Restaurant_id = order.Restaurant_id

            const restaurant = await service.FindRestaurant(Restaurant_id)

            await res.send(restaurant)

        }catch(e){
            res.status(400).send({msg:"not done "+e})
        }
    },
    GetPopularItems: async(req,res)=>{
        try{
            const Restaurant_id = Number(req.query.rid);

            const items = await service.GetPopularItems(Restaurant_id)

            await res.send(items)
        }catch(e){
            res.status(400).send({msg:"not found"})
        }
    },
    GetItems: async(req,res)=>{
        try{
            const Restaurant_id = Number(req.query.rid);

            const items = await service.GetItems(Restaurant_id)

            await res.send(items)
        }catch(e){
            res.status(400).send({msg:"not found"})
        }
    },
    GetActiveOrder: async (req, res) => {
        try {
            const Customer_id = req.query.uid;
            const Restaurant_id = req.query.rid;
    
            const order = await service.GetActiveOrders(Customer_id, Restaurant_id);
    
            // Ensure a response is always sent
            if (order) {
                res.status(200).json(order);  // Send as JSON
            } else {
                res.status(200).json({}); // Return an empty JSON object if no order is found
            }
        } catch (e) {
            console.error("Error in GetActiveOrder:", e.message);
            res.status(500).json({ msg: "Server Error" });  // Use JSON for error message
        }
    },    
    PlaceOrder: async(req,res)=>{
        try{
            const Customer_id = req.query.uid
            const Restaurant_id = req.query.rid

            console.log("uid",Customer_id)
            console.log("rid",Restaurant_id)

            await service.PlaceOrder(Customer_id,Restaurant_id)

            res.status(200).send({msg:"done"})
        }catch(e){
            res.status(400).send({msg:"not done"})
        }
    },
    AddToCart: async (req, res) => {
        try {
          const Customer_id = req.query.uid
          const Restaurant_id = req.query.rid
          const Item_id = req.query.iid
      
          let customerOrder = await service.GetActiveOrders(Customer_id,Restaurant_id)
      
          if (!customerOrder) { 
            customerOrder = await service.CreateOrder(Customer_id,Restaurant_id)
          }
      

          await service.AddToCart({ customerOrder, Restaurant_id, Item_id })

          
          res.status(200).send({msg:"ok"})
        
        } catch (e){
          res.status(400).send({msg:"not found"})
        }
    },
    ViewCart: async(req,res) =>{
        try{
            const Customer_id = req.query.uid
            const Restaurant_id = req.query.rid

            let customerOrder = await service.GetActiveOrders(Customer_id,Restaurant_id)

            if(customerOrder===null)
            {
                res.status(200).send([])
            }
            else
            {
                const val = await service.GetCartItems(customerOrder)

                res.status(200).send(val)
            }
            
        }catch(e){
            res.status(400).send({msg:"done"})
        }
    },
    ViewCart2: async(req,res) =>{
        try{
            const Customer_id = req.query.uid
            const Order_id = req.query.oid

            let customerOrder = await service.FindOrder(Order_id,Customer_id)

            //console.log(customerOrder)

            if(customerOrder===null)
            {
                res.status(200).send([])
            }
            else
            {
                const val = await service.GetCartItems(customerOrder)

                res.status(200).send(val)
            }
            
        }catch(e){
            res.status(400).send({msg:"not found"})
        }
    },    
    ViewDiscounts: async(req,res) =>{
        try{
            const Customer_id = req.query.uid
            const Restaurant_id = req.query.rid

            let customerOrder = await service.GetActiveOrders(Customer_id,Restaurant_id)

            if(customerOrder===null)
            {
                res.send([])
            }
            else
            {
                //const val = await service.GetCartItems(customerOrder)

                const content = await service.GetDiscounts(customerOrder)

                res.send(content)
            }
            
        }catch(e){
            res.status(400).send({msg:"not done"})
        }
    },
    ApplyDiscount: async (req, res) => {
        try {
            const Customer_id = req.query.uid;
            const Restaurant_id = req.query.rid;
            const Discount_id = req.query.did;
    
            const customerOrder = await service.GetActiveOrders(Customer_id,Restaurant_id);
    
            const val = await service.ApplyDiscount({ Restaurant_id, Discount_id, customerOrder });
    
            res.status(200).send({msg:"ok"}) // Send JSON response
        } catch (e) {
            res.status(400).send({msg:"not found"})// Send error as JSON
        }
    },
    GetPastOrders: async(req,res)=>{
        try{
            
            const Customer_id = req.query.uid

            const order = await service.GetPastOrders(Customer_id)

            res.status(200).send(order)

        }catch(e){
            res.status(400).send({msg:"not found"})
        }
    },
    GetWaitingOrders: async(req,res)=>{
        try{
            
            const Customer_id = req.query.uid

            const order = await service.GetWaitingOrders(Customer_id)

            res.status(200).send(order)

        }catch(e){
            res.status(400).send({msg:"not found"})
        }
    },
    GetWaitingOrder2: async(req,res)=>{
        try{
            
            const Customer_id = req.query.uid
            const Restaurant_id = req.query.rid
            const Order_id = req.query.oid

            const order = await service.GetWaitingOrder2(Customer_id,Restaurant_id,Order_id)

            res.status(200).send(order)

        }catch(e){
            res.status(400).send({msg:"not found"})
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
                res.status(404).send({msg:"User not found"});
            } 
        } catch (e) {
            console.error("Error in FindUser:", e);
            res.status(400).send({msg:"Internal server error"});
        }
    },
    FindUser2: async (req, res) => {
        try {
            const email = req.query.email;
            const meal = req.query.meal; // Fix the typo here
    
            console.log("email", email);
            console.log("meal", meal);


            const val = await service.FindUser2(email, meal);
    
            if (val) {
                res.status(200).send(val);
            } else {
                res.status(404).send({msg:"User not found"});
            } 
        } catch (e) {
            console.error("Error in FindUser:", e);
            res.status(400).send({msg:"Internal Server Error"})
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

            if(utils.isEmail(email)===false)
            {
                res.status(400).json({message:"Enter a valid email"})
            }
            else
            {
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
            }



        }catch(e){
            res.status(400).json({message:"not successfull"})
        }
    },
    GetRestaurantReports: async (req, res) => {
        try {
          const customerId = req.query.uid; 
          if (!customerId) {
            return res.status(400).send({ message: "Customer not logged in" });
          }

          const reports = await service.GetRestaurantReportsByCustomerId(customerId);
    
          if (reports.length === 0) {
            return res.status(404).send({ message: "No reports found for this customer" });
          }
    
          res.status(200).send(reports);
        } catch (error) {
          console.error("Error fetching customer reports:", error);
          res.status(500).send({ message: "Failed to fetch customer reports" });
        }
    },
    GetRiderReports: async (req, res) => {
        try {
          const customerId = req.query.uid; 
          if (!customerId) {
            return res.status(400).send({ message: "Customer not logged in" });
          }

          const reports = await service.GetRiderReportsByCustomerId(customerId);
    
          if (reports.length === 0) {
            return res.status(404).send({ message: "No reports found for this customer" });
          }
    
          res.status(200).send(reports);
        } catch (error) {
          console.error("Error fetching customer reports:", error);
          res.status(500).send({ message: "Failed to fetch customer reports" });
        }
    },
    WriteRestaurantReport: async (req, res) => {
        try {
            const { customer_id, restaurant_id, message } = req.body;
    
            // Validate the input
            if (!customer_id || !restaurant_id || !message || message.trim() === "") {
                return res.status(400).send({ message: "Invalid input. All fields are required." });
            }
    
            // Call the service to create the report
            const newReport = await service.CreateRestaurantReport({ customer_id, restaurant_id, message});
    
            res.status(201).send({
                message: "Report submitted successfully",
                report: newReport
            });
        } catch (error) {
            console.error("Error writing a restaurant report:", error);
            res.status(500).send({ message: "Failed to write the restaurant report" });
        }
    },
    WriteRiderReport: async (req, res) => {
        try {
            const { customer_id, rider_id, message } = req.body;
    
            // Validate the input
            if (!customer_id || !rider_id || !message || message.trim() === "") {
                return res.status(400).send({ message: "Invalid input. All fields are required." });
            }
    
            // Call the service to create the report
            const newReport = await service.CreateRiderReport({ customer_id, rider_id, message});
    
            res.status(201).send({
                message: "Report submitted successfully",
                report: newReport
            });
        } catch (error) {
            console.error("Error writing a rider report:", error);
            res.status(500).send({ message: "Failed to write the rider report" });
        }
    },
    GetRider: async(req,res) =>{
        try{
            Rider_id = req.query.rid

            const val = await service.GetRider(Rider_id)

            res.status(200).send(val)
        }catch(e){
            res.status(400).send({msg:"not found"})
        }

    }

}