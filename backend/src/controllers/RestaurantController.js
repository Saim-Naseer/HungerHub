const RestaurantService = require("../services/RestaurantMenuService");
const CounterService = require("../services/CounterService");
const ErrorManager = require("../../errors/error-manager");

module.exports = {
    GetMenu: async (req, res) => {
        try {
            const restaurantId = req.query.rid; // Fix destructuring
            if (!restaurantId) return ErrorManager.getError(res, "RESTAURANT_ID_REQUIRED");
    
            const menuItems = await RestaurantService.getMenuItems(restaurantId);
            if (!menuItems || menuItems.length === 0) {
                return ErrorManager.getError(res, "MENU_NOT_FOUND");
            }
    
            res.status(200).json({ menuItems });
        } catch (error) {
            return ErrorManager.getError(res, "INTERNAL_SERVER_ERROR", error.message);
        }
    },
    

    AddMenuItem: async (req, res) => {
        try {
            const restaurantId = req.query.rid;
            const name = req.query.name;
            const price = parseFloat(req.query.price); // Explicit parsing
            const popular = req.query.popular === "true"; // Ensure boolean conversion
    
            if (!restaurantId || !name || isNaN(price)) {
                return ErrorManager.getError(res, "INVALID_INPUT");
            }
    
            const itemId = await CounterService.Get("Menu"); // Get or generate `itemId`
            const newItem = await RestaurantService.addMenuItem(restaurantId, itemId, name, price, popular);
            await CounterService.Inc("Menu"); 
            res.status(201).json({ message: "Item added successfully", newItem });
        } catch (error) {
            return ErrorManager.getError(res, "INTERNAL_SERVER_ERROR", error.message);
        }
    },
    

    DeleteMenuItem: async (req, res) => {
        try {
            const restaurantId = req.query.rid;
            const itemId = req.query.iid;
    
            if (!restaurantId || !itemId) {
                return ErrorManager.getError(res, "INVALID_INPUT");
            }
    
            const deletedItem = await RestaurantService.deleteMenuItem(restaurantId, itemId);
            if (!deletedItem) return ErrorManager.getError(res, "ITEM_NOT_FOUND");
    
            res.status(200).json({ message: "Item deleted successfully", deletedItem });
        } catch (error) {
            return ErrorManager.getError(res, "INTERNAL_SERVER_ERROR", error.message);
        }
    },
    

    EditMenuItem: async (req, res) => {
        try {
            const restaurantId = req.query.rid;
            const itemId = req.query.iid;
            const updateData = req.query.updateData ? JSON.parse(req.query.updateData) : {}; // Parse safely
    
            if (!restaurantId || !itemId || Object.keys(updateData).length === 0) {
                return ErrorManager.getError(res, "INVALID_INPUT");
            }
    
            const updatedItem = await RestaurantService.editMenuItem(restaurantId, itemId, updateData);
            if (!updatedItem) return ErrorManager.getError(res, "ITEM_NOT_FOUND");
    
            res.status(200).json({ message: "Item updated successfully", updatedItem });
        } catch (error) {
            return ErrorManager.getError(res, "INTERNAL_SERVER_ERROR", error.message);
        }
    },
    
    

    GetActiveOrders: async (req, res) => {
        try {
            const restaurantId  = req.query.rid;
            if (!restaurantId) return ErrorManager.getError(res, "RESTAURANT_ID_REQUIRED");

            const activeOrders = await RestaurantService.getActiveOrders(restaurantId);
            res.status(200).json({ activeOrders });
        } catch (error) {
            return ErrorManager.getError(res, "INTERNAL_SERVER_ERROR", error.message);
        }
    },

    SetOrderReady: async (req, res) => {
        try {
            const orderId  = req.query.oid;
            if (!orderId) return ErrorManager.getError(res, "ORDER_ID_REQUIRED");

            const updatedOrder = await RestaurantService.setOrderReady(orderId);
            if (!updatedOrder) return ErrorManager.getError(res, "ORDER_NOT_FOUND");

            res.status(200).json({ message: "Order marked as ready", updatedOrder });
        } catch (error) {
            return ErrorManager.getError(res, "INTERNAL_SERVER_ERROR", error.message);
        }
    },

    createDiscountVoucher: async (req, res) => {
        try {
            const restaurantId = req.query.rid;
            const name = req.query.name || "Default Voucher";
            const cap = req.query.cap ? parseFloat(req.query.cap) : null;
            const percentage = req.query.percentage ? parseFloat(req.query.percentage) : null;
    
            // Validate inputs
            if (!restaurantId || isNaN(percentage)) {
                return ErrorManager.getError(res, "INVALID_INPUT", "Restaurant ID and valid percentage are required.");
            }
    
            // Get new Discount ID
            const discountId = await CounterService.Get("Discounts");
    
            // Create the discount
            const newDiscount = await RestaurantService.createDiscountVoucher({
                Discount_id: discountId,
                Restaurant_id: restaurantId,
                name,
                cap,
                percentage,
            });
    
            // Increment Discount counter
            await CounterService.Inc("Discounts");
    
            // Respond to the client
            res.status(201).json({ message: "Discount voucher created successfully", newDiscount });
        } catch (error) {
            console.error("Error creating discount voucher:", error);
            return ErrorManager.getError(res, "INTERNAL_SERVER_ERROR", error.message);
        }
    },
    
    

    getRestaurantReports: async (req, res) => {
        try {
            const restaurantId = req.query.rid;
            if (!restaurantId) return ErrorManager.getError(res, "RESTAURANT_ID_REQUIRED");
    
            const reports = await RestaurantService.getRestaurantReports(restaurantId);
    
            // Check if reports are an empty array and handle that case
            if (reports.length === 0) {
                return res.status(200).json({ message: "No reports found for this restaurant", reports });
            }
    
            res.status(200).json({ message: "Reports fetched successfully", reports });
        } catch (error) {
            return ErrorManager.getError(res, "INTERNAL_SERVER_ERROR", error.message);
        }
    },
    GetHistoryOrders: async (req, res) => {
        try {
            const restaurantId  = req.query.rid;
            if (!restaurantId) return ErrorManager.getError(res, "RESTAURANT_ID_REQUIRED");

            const activeOrders = await RestaurantService.getHistoryOrders(restaurantId);
            res.status(200).json({ activeOrders });
        } catch (error) {
            return ErrorManager.getError(res, "INTERNAL_SERVER_ERROR", error.message);
        }
    },


// Update Restaurant Information
    UpdateRestaurant : async (req, res) => {
        try {
            const { Restaurant_id } = req.query;  // Get Restaurant_id from query
            if (!Restaurant_id) {
                return res.status(400).json({ message: "Restaurant_id is required" });
            }

            // Call the service method to handle the update
            const updatedRestaurant = await RestaurantService.updateRestaurantInfo(Restaurant_id, req.body);

            if (!updatedRestaurant) {
                return res.status(404).json({ message: "Restaurant not found" });
            }

            // Respond with updated restaurant info
            res.status(200).json({
                message: "Restaurant information updated successfully.",
                updatedRestaurant: {
                    Restaurant_id: updatedRestaurant.Restaurant_id,
                    name: updatedRestaurant.name,
                    phone: updatedRestaurant.phone,
                    email: updatedRestaurant.email
                }
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    GetRestaurantRatings: async (req, res) => {
        try {
            const { Restaurant_id } = req.query;  // Get Restaurant_id from query
            if (!Restaurant_id) {
                return res.status(400).json({ message: "Restaurant_id is required" });
            }

            // Call the service method to fetch ratings
            const ratings = await RestaurantService.getRestaurantRatings(Restaurant_id);

            if (!ratings) {
                return res.status(404).json({ message: "Restaurant not found" });
            }

            // Respond with the ratings
            res.status(200).json({
                message: "Restaurant ratings fetched successfully.",
                ratings: ratings,
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Get restaurant password
    GetRestaurantPassword: async (req, res) => {
        try {
            const { Restaurant_id } = req.query;  // Get Restaurant_id from query
            if (!Restaurant_id) {
                return res.status(400).json({ message: "Restaurant_id is required" });
            }

            // Call the service method to fetch password
            const password = await RestaurantService.getRestaurantPassword(Restaurant_id);

            if (!password) {
                return res.status(404).json({ message: "Restaurant not found" });
            }

            // Respond with the password (only in secure cases, avoid returning passwords in production)
            res.status(200).json({
                message: "Restaurant password fetched successfully.",
                password: password,
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }



    
};
