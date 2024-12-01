const service = require("../services/RiderServices")
const session = require("../Session")

module.exports = {
    GetActiveOrders: async (req, res) => {
        try{
            const order = await service.GetActiveOrders(1)
            await res.send(order)
        }
        catch(e){
            res.send("No Restaurant found..")
        }
    },

    GetOrderDetails: async (req, res) => {
        try{
            const order = await service.getOrderDetails(1)
            await res.send(order)
        }
        catch(e){
            res.send("No Restaurant found..")
        }
    },

    getOrdersHistory: async (req, res) => {
        try {
          const userId = session.users["User"].id
          const ordersHistory = await service.getOrdersHistory(userId); // Call service method
          return res.status(200).json({
            success: true,
            data: ordersHistory
          });
        } catch (error) {
          return res.status(500).json({
            success: false,
            message: error.message || 'Internal Server Error'
          });
        }
      },

    updateRiderInfo: async (req, res) => {
        const { Rider_id, name, contactno, email, pwd, location } = req.body;

        try {
            // Call the service function to update the rider info
            const updatedRider = await service.updateRider(Rider_id, name, contactno, email, pwd, location);

            // Return a success response
            return res.status(200).json({
                success: true,
                message: 'Rider information updated successfully.',
                data: updatedRider
            });
        } catch (error) {
            console.error('Error in controller:', error);
            return res.status(500).json({
                success: false,
                message: error.message || 'Server error. Please try again later.'
            });
        }
    },

    getRiderReports: async (req, res) => {  
        try {
            // Call the service to get reports for the given Rider_id
            const result = await service.getReports(session.users["User"].id);
    
            // Return the result based on success or failure
            if (result.success) {
                return res.status(200).json({
                    success: true,
                    message: 'Reports fetched successfully.',
                    data: result.data
                });
            } else {
                return res.status(404).json({
                    success: false,
                    message: result.message
                });
            }
        } catch (error) {
            console.error('Error in controller:', error);
            return res.status(500).json({
                success: false,
                message: error.message || 'Server error. Please try again later.'
            });
        }
    },

    getNewOrders: async (req, res) => {
        try {
            // Call the service to get new orders for the given user location
            const result = await service.getNewOrders(session.users["User"].location);
          
            // Return the result based on success or failure
            if (result.success) {
                return res.status(200).json({
                    success: true,
                    message: 'New orders fetched successfully.',
                    data: result.data
                });
            } else {
                return res.status(404).json({
                    success: false,
                    message: result.message
                });
            }
        } catch (error) {
            console.error('Error in controller:', error);
            return res.status(500).json({
                success: false,
                message: error.message || 'Server error. Please try again later.'
            });
        }
    },
    


    setRider: async (req, res) => {
        const { orderId } = req.params; // Extract orderId and userId from the URL parameters
        
    
        try {
            // Call the service to set the Rider_id for the given Order_id
            const result = await service.GetOrder(orderId, session.users["User"].id);
    
            if (result.success) {
                return res.status(200).json({
                    success: true,
                    message: result.message
                });
            } else {
                return res.status(404).json({
                    success: false,
                    message: result.message
                });
            }
        } catch (error) {
            console.error('Error in controller:', error);
            return res.status(500).json({
                success: false,
                message: error.message || 'Server error. Please try again later.'
            });
        }
    }
}




