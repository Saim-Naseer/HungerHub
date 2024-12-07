const Restaurants = require("../models/Restaurant")
const Customers = require("../models/Customer")
const Menu = require("../models/Menu")
const CounterServices = require("./CounterService")
const Orders = require("../models/Order")
const Carts = require("../models/Cart")
const Discounts = require("../models/Discounts")
const Admin = require("../models/Admin")
const Riders = require("../models/Rider")


module.exports = {
    GetRestaurants: async(location) =>{
        return await Restaurants.find({location})
    },
    GetLocation: async(Customer_id) =>{
        const customer =  await Customers.findOne({Customer_id})
        return customer ? customer.location : null
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
    GetPopularItems: async(Restaurant_id) =>{
        return await Menu.find({Restaurant_id,popular:true})
    },
    GetItems: async(Restaurant_id) =>{
        return await Menu.find({Restaurant_id})
    },
    GetActiveOrders: async(Customer_id) =>{
        return await Orders.findOne({Customer_id,isPlaced:false})
    },
    GetPastOrders: async(Customer_id) =>{
      return await Orders.find({Customer_id,completed:true})
    },
    GetWaitingOrders: async(Customer_id) =>{
      return await Orders.find({Customer_id,isPlaced:true,completed:false})
    },
    CreateOrder: async({Customer_id}) =>{
        const orderId = await CounterServices.Get("Order");
        const cartId = await CounterServices.Get("Cart");


        const newOrder = new Orders({
            Customer_id: Customer_id,
            Order_id: orderId,
            Cart_id: cartId,
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
      GetDiscounts: async(cart)=>{
        const RestaurantIds = cart.map((x)=>{
          return x.Restaurant_id
        })

       // return await Discounts.find({Restaurant_id:{$in:RestaurantIds}})

        return await Discounts.aggregate([
          {
            $match: {
              Restaurant_id:{$in:RestaurantIds}
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
              {Customer_id,Order_id},
              {price:n_price},
              {new:true}
            )
    
            return "Discount applied successfully";
        } catch (error) {
            console.error(error);
            throw new Error("Error applying discount");
        }
    }
    
      
}