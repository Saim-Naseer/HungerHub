const MenuModel = require('../models/Menu');
const CustomerModel = require('../models/Customer');
const RiderModel = require('../models/Rider');
const OrderModel = require('../models/Order');
const CartModel = require('../models/Cart');
const Discounts  = require('../models/Discounts');
const RestaurantReport = require('../models/RestaurantReport');

module.exports = {
    // Function to get all menu items for a restaurant
    getMenuItems: async (restaurantId) => {
        try {
            const menuItems = await MenuModel.find({ Restaurant_id: restaurantId });
            return menuItems;
        } catch (error) {
            throw new Error('Error retrieving menu items');
        }
    },

    addMenuItem: async (restaurantId, Item_id, name, price, popular) => {
        try {
            // Create the new menu item
            const newItem = new MenuModel({
                Restaurant_id: restaurantId,
                Item_id,
                name,
                price,
                popular: popular || false,
            });

            // Save the new item to the database
            await newItem.save();
            return newItem;
        } catch (error) {
            throw new Error('Error adding menu item');
        }
    },

    // Function to delete an item from the menu
    deleteMenuItem: async (restaurantId, itemId) => {
        try {
            // Attempt to delete the item based on restaurantId and itemId
            const deletedItem = await MenuModel.findOneAndDelete({
                Restaurant_id: restaurantId,
                Item_id: itemId,
            });
            return deletedItem;
        } catch (error) {
            throw new Error('Error deleting menu item');
        }
    },
    editMenuItem: async (restaurantId, itemId, updateData) => {
        try {
            // Find the item and update its details
            const updatedItem = await MenuModel.findOneAndUpdate(
                { Restaurant_id: restaurantId, Item_id: itemId },
                updateData,
                { new: true } // Return the updated document
            );
            return updatedItem;
        } catch (error) {
            throw new Error('Error updating menu item');
        }
    },

    getActiveOrders: async (restaurantId) => {
        try {
            // Find all cart items associated with the restaurant
            const cartItems = await CartModel.find({ Restaurant_id: restaurantId });
    
            if (!cartItems || cartItems.length === 0) {
                return []; // No cart items for the restaurant
            }
    
            // Extract relevant order IDs from cart items
            const orderIds = cartItems.map(cart => cart.Order_id);
    
            // Find active orders using order IDs
            const activeOrders = await OrderModel.find({
                Order_id: { $in: orderIds },
                isPlaced: true, // Order has been placed
                isReady: false,
                completed: false // Order is not completed/delivered
            });
    
            if (!activeOrders || activeOrders.length === 0) {
                return []; // No active orders found
            }
    
            // Prepare detailed response for each active order
            const detailedOrders = await Promise.all(
                activeOrders.map(async (order) => {
                    // Fetch associated customer and rider details
                    const customer = await CustomerModel.findOne({ Customer_id: order.Customer_id });
                    const rider = await RiderModel.findOne({ Rider_id: order.Rider_id });
    
                    // Fetch items in the cart for this order
                    const orderCartItems = cartItems.filter(cart => cart.Order_id === order.Order_id);
    
                    // Fetch item names and calculate total price
                    const items = await Promise.all(
                        orderCartItems.map(async (item) => {
                            const menuItem = await MenuModel.findOne({ Item_id: item.Item_id });
                            return {
                                Item_id: item.Item_id,
                                name: menuItem ? menuItem.name : 'Unknown',
                                price: item.price,
                                qty: item.qty
                            };
                        })
                    );
    
                    const totalPrice = items.reduce((sum, item) => sum + item.price * item.qty, 0);
    
                    // Determine the payment method
                    const paymentMethod = order.ATM
                        ? 'ATM'
                        : order.COD
                        ? 'Cash on Delivery'
                        : 'Unknown';
    
                    return {
                        Order_id: order.Order_id,
                        customerName: customer ? customer.name : 'Unknown',
                        riderName: rider ? rider.name : 'Unknown',
                        items: items,
                        totalPrice: totalPrice,
                        paymentMethod: paymentMethod
                    };
                })
            );
    
            return detailedOrders;
        } catch (error) {
            throw new Error('Error retrieving active orders: ' + error.message);
        }
    },

    setOrderReady: async (orderId) => {
        try {
            // Find the order by ID and update its `isReady` status
            const updatedOrder = await OrderModel.findOneAndUpdate(
                { Order_id: orderId, isPlaced: true, isReady: false }, // Ensure it matches criteria
                { $set: { isReady: true } }, // Update the `isReady` field
                { new: true } // Return the updated document
            );
    
            return updatedOrder;
        } catch (error) {
            throw new Error('Error updating order status: ' + error.message);
        }
    },

    createDiscountVoucher: async (data) => {
        const { Discount_id, Restaurant_id, name, cap, percentage } = data;
    
        // Validate required fields
        if (!Discount_id || !Restaurant_id || !percentage) {
          throw new Error('Discount_id, Restaurant_id, and percentage are required');
        }
    
        // Check if a discount with the same ID already exists
        const existingDiscount = await Discounts.findOne({ Discount_id });
        if (existingDiscount) {
          throw new Error('A discount with this ID already exists');
        }
    
        // Create a new discount voucher
        const newDiscount = new Discounts({
          Discount_id,
          Restaurant_id,
          name,
          cap,
          percentage,
        });
    
        // Save the new discount to the database
        await newDiscount.save();
        return newDiscount;
      },

    getRestaurantReports: async (restaurantId) => {
        try {
          // Fetch all reports for the specified restaurant
          const reports = await RestaurantReport.find({ Restaurant_id: restaurantId });
    
          if (!reports || reports.length === 0) {
            throw new Error('No reports found for this restaurant');
          }
    
          return reports;
        } catch (error) {
          console.error('Error fetching restaurant reports:', error.message);
          throw error;
        }
      },
    
};
