const MenuModel = require('../models/Menu'); // Menu model to interact with MongoDB

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
};
