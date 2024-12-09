const Order = require("../models/Order")
const Cart = require("../models/Cart")
// const Counter = require("../models/Counter")
const Customer = require("../models/Customer")
const Restaurant = require("../models/Restaurant")
const Rider = require("../models/Rider")
const RiderReport = require("../models/RiderReport")



const GetActiveOrders = async (userId) => {
    try {
        // Step 1: Fetch all active orders for the given Rider_id
        const activeOrders = await Order.find({
            Rider_id: userId,
            completed: false
        });
        if(activeOrders){
            console.log("orders found")
        }
        if (!activeOrders || activeOrders.length === 0) {
            throw new Error('No active orders found');
        }

        // Step 2: Map over active orders and retrieve related data
        const results = await Promise.all(
            activeOrders.map(async (order) => {
                // Fetch the associated cart
                const cart = await Cart.findOne({ Cart_id: order.Cart_id }, 'Restaurant_id');
                if (!cart) {
                    throw new Error(`Cart not found for Cart_id: ${order.Cart_id}`);
                }

                // Fetch the associated restaurant
                const restaurant = await Restaurant.findOne(
                    { Restaurant_id: cart.Restaurant_id }
                );
                if (!restaurant) {
                    throw new Error(`Restaurant not found for Restaurant_id: ${cart.Restaurant_id}`);
                }

                // Fetch the associated customer
                const customer = await Customer.findOne(
                    { Customer_id: order.Customer_id }
                );
                if (!customer) {
                    throw new Error(`Customer not found for Customer_id: ${order.Customer_id}`);
                }

                // Return the required data
                return {
                    orderId: order.Order_id,
                    restaurantAddress: restaurant.exact_address || 'Unknown',
                    restaurantName: restaurant.name || 'Unknown',
                    customerAddress: customer.exact_address || 'Unknown',
                    orderAmount: order.price,
                }; 
            })
        );
        console.log(results)
        return results;
    } catch (error) {
        console.error('Error fetching active orders:', error.message);
        throw new Error('Error fetching active orders');
    }
};


const getOrderDetails = async (orderId) => {
    try {
        // Step 1: Fetch the order by Order_id
        const order = await Order.findOne({ Order_id: orderId });

        if (!order) throw new Error('Order not found');

        // Step 2: Fetch the associated customer
        const customer = await Customer.findOne(
            { Customer_id: order.Customer_id }
        );

        if (!customer) throw new Error('Customer not found');

        // Step 3: Fetch the associated cart
        const cart = await Cart.findOne(
            { Cart_id: order.Cart_id },
            'Restaurant_id'
        );

        if (!cart) throw new Error('Cart not found');

        // Step 4: Fetch the associated restaurant
        const restaurant = await Restaurant.findOne(
            { Restaurant_id: cart.Restaurant_id }
        );

        if (!restaurant) throw new Error('Restaurant not found');

        // Step 5: Return the formatted result
        return {
            orderId: order.Order_id,
            orderTime: order.date || 'Unknown',
            orderAmount: order.price,
            customer: {
                name: customer.name,
                contact: customer.phone || 'N/A',
                address: customer.exact_address || 'Unknown'
            },
            restaurant: {
                name: restaurant.name,
                contact: restaurant.phone || 'N/A',
                address: restaurant.exact_address || 'Unknown'
            }
        };
    } catch (error) {
        console.error('Error fetching order details:', error.message);
        throw new Error('Error fetching order details');
    }
};


const getOrdersHistory = async (userId) => {  
    try {
        const orders = await Order.find({ Rider_id: userId, completed: true });
    
        const results = await Promise.all(
            orders.map(async (order) => {
                const cart = await Cart.findOne({Cart_id: order.Cart_id });
                if (!cart) {
                    return {
                        restaurantName: 'Unknown',
                        customerAddress: 'Unknown',
                        orderDate: 'Unknown',
                        price: order.price,
                        error: `Cart not found for Cart_id: ${order.Cart_id}`,
                    };
                }
    
                const restaurant = await Restaurant.findOne({ Restaurant_id: cart.Restaurant_id });
                const customer = await Customer.findOne({ Customer_id: order.Customer_id });
                
                return {
                    restaurantName: restaurant?.name || 'Unknown',
                    customerAddress: customer?.exact_address || 'Unknown',
                    orderDate: order.date || 'Unknown',
                    price: order.price,
                };
            })
        );
        return results;
    } catch (error) {
        console.error('Error in fetching orders history:', error);
    }
  };

  const updateRider = async (Rider_id, name, contactno, email, pwd, location) => {
    try {
        // Validate the required fields
        if (!Rider_id || !name || !contactno || !email || !pwd || !location) {
            throw new Error('All fields (Rider_id, Name, Contact No, Email, Password, Location) are required.');
        }

        // Step 1: Find the Rider by Rider_id
        const rider = await Rider.findOne({ Rider_id });

        // Step 2: If rider is not found, return an error
        if (!rider) {
            throw new Error('Rider not found.');
        }

        // Step 3: Update the rider's information
        rider.name = name || rider.name;
        rider.contactno = contactno || rider.contactno;
        rider.email = email || rider.email;
        rider.pwd = pwd || rider.pwd;
        rider.location = location || rider.location;

        // Step 4: Save the updated rider data
        await rider.save();

        // Step 5: Return the updated rider data
        return rider;

    } catch (error) {
        throw new Error(`Error updating rider info: ${error.message}`);
    }
};

const getReports = async (Rider_id) => {
    try {
        // Step 1: Find all reports by the given Rider_id
        const reports = await RiderReport.find({ Rider_id });

        // Step 2: If no reports are found, return an empty array
        if (!reports || reports.length === 0) {
            return {
                success: false,
                message: 'No reports found for this rider.'
            };
        }

        // Step 3: Extract only the 'Message' field from each report
        const reportMessages = reports.map(report => report.Message);

        // Step 4: Return the array of report messages
        return {
            success: true,
            data: reportMessages
        };
    } catch (error) {
        throw new Error(`Error fetching rider reports: ${error.message}`);
    }
};


const Get_Rider = async (riderId) => {
    if (!riderId) {
        throw new Error("Rider ID is required.");
    }

    try {
        // Step 1: Find all reports by the given Rider_id
        const reports = await Rider.find({ Rider_id: riderId });
        
        // If no reports are found, you can throw an error or handle it as needed
        if (reports.length === 0) {
            throw new Error("No Rider data found");
        }

        return reports;
    } catch (error) {
        throw new Error(`Error fetching rider data: ${error.message}`);
    }
};


const getNewOrders = async (userLocation) => {
    try {

        console.log("userlocation:", userLocation)
        // Step 1: Fetch orders where Rider_id is -1
        const orders = await Order.find({ Rider_id: -1, completed: false });
        
        // Step 2: Filter orders based on matching restaurant location with user's location
        const newOrders = [];

        for (const order of orders) {
            // Fetch Cart based on Cart_id from Order
            const cart = await Cart.findOne({ Cart_id: order.Cart_id });
            
            const customer = await Customer.findOne({ Customer_id: order.Customer_id });
           
            if (cart) {
                // Fetch the Restaurant based on Restaurant_id from Cart
                const restaurant = await Restaurant.findOne({ Restaurant_id: cart.Restaurant_id });
                if (restaurant) {
                    // Compare restaurant's location with user's location                  
                    if (userLocation === restaurant.location) {

                    
                        // If locations match, add this order to the result
                        newOrders.push({
                            order_id: order.Order_id,
                            orderAmount: order.price,
                            restaurantName: restaurant.name,
                            restaurantLocation: restaurant.exact_address,
                            customerLocation: customer.exact_address,
                            orderDate: order.date
                        });
                    }
                }
            }
        }
        
        // Step 3: Return the filtered new orders
        if (newOrders.length === 0) {
            console.log("No new orders found")
            return {
                success: false,
                message: 'No new orders found for your location.'
            };
        }
        console.log(newOrders)
        return {
            success: true,
            data: newOrders
        };
    } catch (error) {
        console.log("Error in api")
        throw new Error(`Error fetching new orders: ${error.message}`);
    }
};

const GetOrder = async (orderId, userId) => {
    try {
        // Find the order by Order_id
        const order = await Order.findOne({ Order_id: orderId });

        if (!order) {
            return {
                success: false,
                message: `Order with Order_id ${orderId} not found`
            };
        }
        console.log(order)
        // Update the Rider_id field to the provided userId
        order.Rider_id = userId;

        // Save the updated order document
        await order.save();

        return {
            success: true,
            message: `Rider ID updated successfully for Order ID ${orderId}`
        };
    } catch (error) {
        console.error('Error updating Rider ID:', error);
        return {
            success: false,
            message: `Error updating Rider ID: ${error.message}`
        };
    }
};

const completeOrder = async (orderId) => {
    try {
        // Find the order by Order_id
        const order = await Order.findOne({ Order_id: orderId });

        if (!order) {
            return {
                success: false,
                message: `Order with Order_id ${orderId} not found`
            };
        }

        // Update the 'completed' field to true
        order.completed = true;

        // Save the updated order document
        await order.save();

        return {
            success: true,
            message: `Order with Order_id ${orderId} marked as completed`
        };
    } catch (error) {
        console.error('Error completing the order:', error);
        return {
            success: false,
            message: `Error completing the order: ${error.message}`
        };
    }
};

  
  
  



module.exports = {
    GetActiveOrders,
    getOrderDetails,
    getOrdersHistory,
    updateRider,
    getReports,
    getNewOrders,
    GetOrder,
    completeOrder,
    Get_Rider
};



