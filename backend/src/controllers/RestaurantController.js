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
    
            if (!restaurantId || isNaN(percentage)) return ErrorManager.getError(res, "INVALID_INPUT");
    
            const discountId = await CounterService.Get("Discounts");
            const newDiscount = await RestaurantService.createDiscountVoucher({
                Discount_id: discountId,
                Restaurant_id: restaurantId,
                name,
                cap,
                percentage,
            });
            await CounterService.Inc("Discounts");
            res.status(201).json({ message: "Discount voucher created successfully", newDiscount });
        } catch (error) {
            return ErrorManager.getError(res, "INTERNAL_SERVER_ERROR", error.message);
        }
    },
    

    getRestaurantReports: async (req, res) => {
        try {
            const restaurantId = req.query.rid;
            if (!restaurantId) return ErrorManager.getError(res, "RESTAURANT_ID_REQUIRED");

            const reports = await RestaurantService.getRestaurantReports(restaurantId);
            res.status(200).json({ message: "Reports fetched successfully", reports });
        } catch (error) {
            return ErrorManager.getError(res, "INTERNAL_SERVER_ERROR", error.message);
        }
    },
};
