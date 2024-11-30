const RestaurantService = require('../services/RestaurantMenuService');
const ErrorManager = require('../../errors/error-manager');

module.exports = {
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
};
 