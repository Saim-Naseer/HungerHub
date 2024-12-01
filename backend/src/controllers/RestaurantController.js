const RestaurantService = require('../services/RestaurantMenuService');
const ErrorManager = require('../../errors/error-manager');

module.exports = {

    // Create: async (req,res) => {

    //     try{

    //         const item = new cartmodel({
    //             Customer_id:1,
    //             Restaurant_id:1,
    //             Message: "The food was delicious but took a bit longer than expected.",
    //             Reply: "We apologize for the delay. We're working on improving our delivery times."
  
    //         })
    
    //         await item.save()

    //         res.send("done")

    //     }catch(e){

    //         res.send("not done")
    //     }
    // },

    // Existing function to get menu items
    GetMenu: async (req, res) => {
        try {
            const restaurantId = req.params.restaurantId;
            const menuItems = await RestaurantService.getMenuItems(restaurantId);
            if (!menuItems) {
                return ErrorManager.getError(res, 'MENU_NOT_FOUND');
            }
            res.status(200).json(menuItems);
        } catch (error) {
            return ErrorManager.getError(res, 'INTERNAL_SERVER_ERROR');
        }
    },

    AddMenuItem: async (req, res) => {
        try {
            const restaurantId = req.params.restaurantId;
            const { Item_id, name, price, popular } = req.body;

            // Validate input
            if (!Item_id || !name || !price) {
                return ErrorManager.getError(res, 'INVALID_INPUT');
            }

            // Call the service to add the new menu item
            const newItem = await RestaurantService.addMenuItem(restaurantId, Item_id, name, price, popular);

            // Return success response
            res.status(201).json({ message: 'Item added successfully', newItem });
        } catch (error) {
            return ErrorManager.getError(res, 'INTERNAL_SERVER_ERROR');
        }
    },

    // New function to delete item from the menu
    DeleteMenuItem: async (req, res) => {
        try {
            const { restaurantId, itemId } = req.params;
            const deletedItem = await RestaurantService.deleteMenuItem(restaurantId, itemId);

            if (!deletedItem) {
                return ErrorManager.getError(res, 'ITEM_NOT_FOUND');
            }

            res.status(200).json({ message: 'Item deleted successfully', deletedItem });
        } catch (error) {
            return ErrorManager.getError(res, 'INTERNAL_SERVER_ERROR'); 
        }
    },
    EditMenuItem: async (req, res) => {
        try {
            const { restaurantId, itemId } = req.params;
            const updateData = req.body; // Data to update (e.g., name, price, popular)
    
            const updatedItem = await RestaurantService.editMenuItem(restaurantId, itemId, updateData);
    
            if (!updatedItem) {
                return ErrorManager.getError(res, 'ITEM_NOT_FOUND');
            }
    
            res.status(200).json({ message: 'Item updated successfully', updatedItem });
        } catch (error) {
            return ErrorManager.getError(res, 'INTERNAL_SERVER_ERROR');
        }
    },
    GetActiveOrders: async (req, res) => {
        try {
            const restaurantId = req.params.restaurantId;
            const activeOrders = await RestaurantService.getActiveOrders(restaurantId);

            if (!activeOrders || activeOrders.length === 0) {
                return ErrorManager.getError(res, 'NO_ACTIVE_ORDERS');
            }

            res.status(200).json({ activeOrders });
        } catch (error) {
            return ErrorManager.getError(res, 'INTERNAL_SERVER_ERROR', error.message);
        }
    },

    SetOrderReady: async (req, res) => {
        try {
            const { orderId } = req.params; // Get order ID from route params
    
            // Call service to update the order
            const updatedOrder = await RestaurantService.setOrderReady(orderId);
    
            if (!updatedOrder) {
                return res.status(404).json({ error: 'Order not found or already updated' });
            }
    
            res.status(200).json({
                message: 'Order marked as ready successfully',
                order: updatedOrder
            });
        } catch (error) {
            return ErrorManager.getError(res, 'INTERNAL_SERVER_ERROR');
        }
    },

    createDiscountVoucher: async (req, res) => {
        try {
          const discountData = req.body;
    
          // Call the service to create the discount voucher
          const newDiscount = await RestaurantService.createDiscountVoucher(discountData);
    
          // Respond with success
          return res.status(201).json({
            message: 'Discount voucher created successfully',
            discount: newDiscount,
          });
        } catch (error) {
          console.error('Error creating discount voucher:', error.message);
          return ErrorManager.getError(res, 'INTERNAL_SERVER_ERROR', error.message);
        }
      },

    getRestaurantReports: async (req, res) => {
        try {
          const { restaurantId } = req.params;
    
          if (!restaurantId) {
            return ErrorManager.getError(res, 'BAD_REQUEST', 'Restaurant ID is required');
          }
    
          // Fetch restaurant reports from the service
          const reports = await RestaurantService.getRestaurantReports(restaurantId);
    
          return res.status(200).json({
            message: 'Reports fetched successfully',
            reports,
          });
        } catch (error) {
          console.error('Error in getRestaurantReports:', error.message);
          return ErrorManager.getError(res, 'INTERNAL_SERVER_ERROR', error.message);
        }
      },
    
    
    
};
 