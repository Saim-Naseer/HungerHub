const Restaurants = require("../models/Restaurant")
const Customers = require("../models/Customer")
const Menu = require("../models/Menu")
const CounterServices = require("./CounterService")
const Orders = require("../models/Order")
const Carts = require("../models/Cart")
const Discounts = require("../models/Discounts")
const Admin = require("../models/Admin")
const Riders = require("../models/Rider")

const RestaurantReport = require("../models/RestaurantReport")
const RiderReport = require("../models/RiderReport")
const mongoose = require('mongoose');

const fs = require("fs");
const path = require("path");
const Cart = require("../models/Cart")

module.exports = {
    GetRestaurants: async(location) =>{
        return await Restaurants.find({location})
    },
    GetLocation: async(Customer_id) =>{
        const customer =  await Customers.findOne({Customer_id})
        return customer ? customer.location : null
    },
    FindOrder: async(Order_id,Customer_id) =>{
      return await Orders.findOne({Order_id,Customer_id})
    },
    PlaceOrder: async(Customer_id,Restaurant_id)=>{
      console.log("before",await Orders.find({Customer_id,Restaurant_id,isPlaced:false}))

      await Orders.findOneAndUpdate(
        {Customer_id,Restaurant_id,isPlaced:false},
        { 
          $set: { 
            isPlaced: true, 
            date: new Date() 
          } 
        },
        {new:true}
      )

      console.log("after",await Orders.find({Customer_id,Restaurant_id,isPlaced:true}))
    },
    deleteCartItem: async (rid, iid) => {
      const cartItem = await Carts.findOne({
        Restaurant_id: Number(rid),
        Item_id:       Number(iid),
      });
      if (!cartItem) {
        // nothing to delete
        return { deleted: null, updatedOrder: null };
      }
    
      const { Cart_id, price, qty } = cartItem;
      const amountToSubtract = price;
    
      // 2. Delete the cart item
      const deleted = await Carts.findOneAndDelete({
        Restaurant_id: Number(rid),
        Item_id:       Number(iid),
      });
    
      // 3. Decrement the corresponding order's total price
      const updatedOrder = await Orders.findOneAndUpdate(
        {
          Cart_id:       Cart_id,
          Restaurant_id: Number(rid),
        },
        {
          // subtract the cart-item total from the order price
          $inc: { price: -amountToSubtract }
        },
        {
          new: true  // return the updated document
        }
      );
      return { deleted, updatedOrder };
    },
    setGroupOrder: async (orderId, goc) => {
      try {
        if (!mongoose.Types.ObjectId.isValid(orderId)) {
          throw new Error('Invalid order ID');
        }
    
        const order = await Orders.findOne({ Order_id: orderId }); // this supports .save()

    
        if (!order) {
          throw new Error('Order not found');
        }
    
        order.groupOrderCode = goc;
        order.isGroupOrder = true;
    
        const updatedOrder = await order.save();
    
        return updatedOrder;
      } catch (err) {
        throw err;
      }
    },
    cancelGroupOrder: async (customerId) => {
      try {
        // Assuming the latest active order is the one to cancel
        const order = await Orders.findOne({ Customer_id: customerId }).sort({ createdAt: -1 });
    
        if (!order) {
          throw new Error('Order not found');
        }
    
        order.groupOrderCode = '';
        order.isGroupOrder = false;
    
        const updatedOrder = await order.save();
        return updatedOrder;
      } catch (err) {
        throw err;
      }
    },
    findGroupOrderByCode: async (groupOrderCode) => {
      try {
        const order = await Orders.findOne({ 
          groupOrderCode: groupOrderCode,
          isGroupOrder: true 
        });
    
        return order;
      } catch (err) {
        throw err;
      }
    },
    FindRestaurant: async(Restaurant_id) =>{
      return await Restaurants.findOne({Restaurant_id})
    },
    UpdateUser: async(Customer_id,name,email,phone,address,location)=>{
      await Customers.findOneAndUpdate({Customer_id},
        {
          name,
          email,
          phone,
          exact_address:address,
          location 
        },
        {new:true}
      )
    },
    FindUser: async (email, pwd) => {
      let val;
  
      val = await Admin.findOne({ email, pwd });
    
      if (val) {
          console.log("admin", val);
          return val;
      }
  
      val = await Customers.findOne({ email, pwd });
      if (val) {
          console.log("customer", val);
          return val; 
      }
  
      val = await Restaurants.findOne({ email, pwd });
      if (val) {
          console.log("restaurant", val);
          return val;
      }
  
      val = await Riders.findOne({ email, pwd });
      if (val) {
          console.log("rider", val);
          return val;
      }
  
      return null;
    },
    FindUser2: async (email, meal) => {
      let val;
  
      val = await Admin.findOne({ email, forget_pwd:meal });
      if (val) {
          console.log("admin", val);
          return val;
      }
  
      val = await Customers.findOne({ email, forget_pwd:meal });
      if (val) {
          console.log("customer", val);
          return val; 
      }
  
      val = await Restaurants.findOne({ email, forget_pwd:meal });
      if (val) {
          console.log("restaurant", val);
          return val;
      }
  
      val = await Riders.findOne({ email, forget_pwd:meal });
      if (val) {
          console.log("rider", val);
          return val;
      }
  
      return null;
    },  
    GetPopularItems: async(Restaurant_id) =>{
        return await Menu.find({Restaurant_id,popular:true})
    },
    GetItems: async(Restaurant_id) =>{
        return await Menu.find({Restaurant_id})
    },
    GetActiveOrders: async (Customer_id, Restaurant_id) => {
      return await Orders.findOne({ Customer_id, Restaurant_id, isPlaced: false }) || null;
    },  
    GetPastOrders: async(Customer_id) =>{
      return await Orders.find({Customer_id,completed:true})
    },
    GetWaitingOrders: async(Customer_id) =>{
      return await Orders.find({Customer_id,isPlaced:true,completed:false})
    },
    GetWaitingOrder2: async(Customer_id,Restaurant_id,Order_id) =>{
      return await Orders.findOne({Customer_id,Restaurant_id,Order_id,isPlaced:true,completed:false})
    },
    GetRider: async(Rider_id)=>{
      return await Riders.findOne({Rider_id})
    },
    CreateOrder: async(Customer_id,Restaurant_id) =>{
        const orderId = await CounterServices.Get("Order");
        const cartId = await CounterServices.Get("Cart");


        const newOrder = new Orders({
            Customer_id: Customer_id,
            Restaurant_id:Restaurant_id,
            Order_id: orderId,
            Cart_id: cartId,
            date: new Date()
        });

    
        await newOrder.save();

    
        await CounterServices.Inc("Order");
        await CounterServices.Inc("Cart");
        
        return await Orders.findOne({Order_id:orderId})
    },
    AddToCart: async ({ customerOrder, Restaurant_id, Item_id }) => {
        const cid = customerOrder.Cart_id;
        const oid = customerOrder.Order_id;
    
        // Find the cart item
        const val = await Carts.findOne({ Order_id: oid, Cart_id: cid, Item_id, Restaurant_id });
    
        // Get the item's price from the Menu
        const item = await Menu.findOne({ Item_id, Restaurant_id });
        const price = item ? item.price : 0;
    
        if (!val) {
            // If the item doesn't exist in the cart, add it with the item's price
            const newCartItem = new Carts({
                Cart_id: cid,
                Restaurant_id: Restaurant_id,
                Item_id: Item_id,
                Order_id: oid,
                price: price,
                qty: 1
            });
    
            await newCartItem.save();
        } else {
            await Carts.findOneAndUpdate(
                { Order_id: oid, Cart_id: cid, Item_id, Restaurant_id },
                {
                    $inc: { qty: 1 },
                    $set: { price: price * (val.qty + 1) } 
                },
                { new: true }
            );
        }

        await Orders.findOneAndUpdate(
            {Customer_id:customerOrder.Customer_id,Order_id:oid},
            { $inc: { price: price } }, 
            { new: true }
        )
    },
    GetCartItems: async (customerOrder) => {
        const cid = customerOrder.Cart_id;
        const oid = customerOrder.Order_id;
      
        return await Carts.aggregate([
          {
            $match: {
              Order_id: oid,
              Cart_id: cid,
            },
          },
          {
            $lookup: {
              from: "menus", // Name of the Menu collection (usually pluralized in MongoDB)
              localField: "Item_id", // Field in Cart to match
              foreignField: "Item_id", // Field in Menu to match
              as: "itemDetails", // Output array field name
            },
          },
          {
            $unwind: "$itemDetails", // Flatten the array for easier access
          },
          {
            $project: {
              Restaurant_id: 1,
              Item_id: 1,
              Order_id: 1,
              Cart_id: 1,
              price: 1,
              qty: 1,
              
              "itemDetails.name": 1,
              "itemDetails.price": 1,
              "itemDetails.popular": 1,
            },
          },
        ]);

      },
      GetDiscounts: async(customerOrder)=>{
        // const RestaurantIds = cart.map((x)=>{
        //   return x.Restaurant_id
        // })

        const Restaurant_id=customerOrder.Restaurant_id

       // return await Discounts.find({Restaurant_id:{$in:RestaurantIds}})

        return await Discounts.aggregate([
          {
            $match: {
              Restaurant_id:Restaurant_id
            },
          },
          {
            $lookup: {
              from: "restaurants", // Name of the Menu collection (usually pluralized in MongoDB)
              localField: "Restaurant_id", // Field in Cart to match
              foreignField: "Restaurant_id", // Field in Menu to match
              as: "RestaurantDetails", // Output array field name
            },
          },
          {
            $unwind: "$RestaurantDetails", // Flatten the array for easier access
          },
          {
            $project: {
              Restaurant_id: 1,
              Discount_id:1,
              name:1,
              cap:1,
              percentage:1,
              "RestaurantDetails.name": 1
            },
          },
        ]);


      },
      ApplyDiscount: async ({ Restaurant_id, Discount_id, customerOrder }) => {
        try {
            const discount = await Discounts.findOne({ Restaurant_id, Discount_id });
            if (!discount) throw new Error("Discount not found");
    
            const { percentage, cap } = discount;
            const { Order_id, Cart_id, Customer_id, price } = customerOrder;
    
            const f_cart = await Carts.find({ Order_id, Cart_id });
            if (!f_cart.length) throw new Error("Cart is empty");
    
            let d_price = 0;
            f_cart.forEach((x) => {
                const potential_discount = (x.price / 100) * percentage;
                if (d_price + potential_discount <= cap) {
                    d_price += potential_discount;
                }
                else
                {
                  d_price=cap
                }
            });
    
            const n_price= price - d_price

            if(n_price<0)
            {
              n_price=0
            }


            await Orders.findOneAndUpdate(
              {Customer_id,Order_id,Restaurant_id},
              {price:n_price},
              {new:true}
            )
    
            return "Discount applied successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Error applying discount");
        }
    },

    GetRestaurantReportsByCustomerId: async (customerId) => {
      try {
        return await RestaurantReport.find({ Customer_id: customerId });
      } catch (error) {
        console.error("Error fetching reports for customer:", error);
        throw error;
      } 
    },
    GetRiderReportsByCustomerId: async (customerId) => {
      try {
        return await RiderReport.find({ Customer_id: customerId });
      } catch (error) {
        console.error("Error fetching reports for customer:", error);
        throw error;
      }
    },
    check_email: async(role,email)=>{
      let val
      if(role==="Customer")
      {
        val = await Customers.findOne({email})
      }
      else if(role==="Restaurant")
      {
        val = await Restaurants.findOne({email})
      }
      else if(role==="Rider")
      {
        val = await Riders.findOne({email})
      }

      if(val!==null)
      {
        return "Email already Exists"
      }
      else{
        return "found"
      }

    },
    Signup_Customer: async(name,email,phone,location,address,pwd,forget) => {

      const id = await CounterServices.Get("Customer")
      await CounterServices.Inc("Customer")

      const val2 = await new Customers({
        Customer_id:id,
        email:email,
        pwd:pwd,
        name:name,
        location:location,
        phone:Number(phone),
        exact_address:address,
        forget_pwd:forget
      })

      await val2.save()

      return "succesfull"
    },
    SaveImage: async (imageFile) => {
      console.log("in")
      const uploadDir = path.join(__dirname, "../../../frontend/my-app/public/Images");

      console.log(uploadDir)

      // Ensure directory exists
      if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
      }

      const filePath = path.join(uploadDir, imageFile.name);

      // Save the file to the local directory
      await imageFile.mv(filePath);

      return `/Images/${imageFile.name}`; // Relative path to access the file from the frontend
    },
    Signup_Restaurant: async(name,email,phone,location,address,pwd,forget,image2,cusine,description) => {
      
      const id = await CounterServices.Get("Restaurant")
      await CounterServices.Inc("Restaurant")

      const val2 = await new Restaurants({
        Restaurant_id:id,
        email:email,
        pwd:pwd,
        name:name,
        location:location,
        phone:Number(phone),
        exact_address:address,
        forget_pwd:forget,
        image:image2,
        cusine:cusine,
        description:description
      })

      console.log(val2)

      await val2.save()
 
      return "succesfull"
    },
    Signup_Rider: async(name,email,phone,location,address,pwd,forget,image2) => {
      
      const id = await CounterServices.Get("Rider")
      await CounterServices.Inc("Rider")

      const val2 = await new Riders({
        Rider_id:id,
        email:email,
        pwd:pwd,
        name:name,
        location:location,
        phone:Number(phone),
        exact_address:address,
        forget_pwd:forget,
        image:image2
      })

      console.log(val2)

      await val2.save()

      return "succesfull"

    },
    CreateRestaurantReport: async (reportData) => {
      try {
          const newReport = new RestaurantReport({
              Customer_id: reportData.customer_id,
              Restaurant_id: reportData.restaurant_id,
              Message: reportData.message,
              Reply: "" // Initialize with an empty reply
          });
  
          // Save the report to the database
          return await newReport.save();
      } catch (error) {
          console.error("Error creating a restaurant report:", error);
          throw error;
      }  
 `` },
    CreateRiderReport: async (reportData) => {
      try {
          const newReport = new RiderReport({
              Customer_id: reportData.customer_id,
              Rider_id: reportData.rider_id,
              Message: reportData.message,
              Reply: "" // Initialize with an empty reply
          });

          // Save the report to the database
          return await newReport.save();
      } catch (error) {
          console.error("Error creating a rider report:", error);
          throw error;
      }
}  
    
      
}