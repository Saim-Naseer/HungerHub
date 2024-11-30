const MenuModel = require('../models/Menu'); // Import the Menu model

module.exports = {
    // Function to get menu items for a given restaurantId
    GetMenuItems: async (restaurantId) => {
        return await MenuModel.find({ Restaurant_id: restaurantId }); // Query the Menu model based on restaurantId
    },
};
