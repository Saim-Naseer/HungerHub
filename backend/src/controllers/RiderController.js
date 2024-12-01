const service = require("../services/RiderServices")

module.exports = {
    GetActiveOrders: async (req, res) => {
        const { riderId } = req.params;
        try{
            const order = await service.GetActiveOrders(riderId)
            await res.send(order)
        }
        catch(e){
            res.send("No Restaurant found..")
        }
    },

    GetOrderDetails: async (req, res) => {
        const { orderId } = req.params;
        try{
            const order = await service.getOrderDetails(orderId)
            await res.send(order)
        }
        catch(e){
            res.send("No Restaurant found..")
        }
    },


    getOrdersHistory: async (req, res) => {
        const { riderId } = req.params;
       
        try {
          
          const ordersHistory = await service.getOrdersHistory(riderId); // Call service method
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
            const { riderId } = req.params; 
            console.log(riderId)
            // Call the service to get reports for the given Rider_id
            const result = await service.getReports(riderId);
    
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
        const { riderLocation } = req.params; 
        try {
            // Call the service to get new orders for the given user location
            const result = await service.getNewOrders(riderLocation);
          
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
        const { orderId, riderId } = req.params; // Extract orderId and userId from the URL parameters
        
    
        try {
            // Call the service to set the Rider_id for the given Order_id
            const result = await service.GetOrder(orderId, riderId);
    
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
    },

    completeOrder: async (req, res) => {
        const { orderId } = req.params; // Extract orderId from the URL parameters
        try {
            // Call the service to complete the order for the given Order_id
            const result = await service.completeOrder(orderId);
    
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
    },

    getRiderInfo: async (req, res) => {
        try {
            const riderId = req.params.riderId; // Extract riderId from request params
            
            if (!riderId) {
                return res.status(400).json({
                    success: false,
                    message: "Rider ID is required."
                });
            }
    
            // Call the service function to get reports for the rider
            const reports = await service.Get_Rider(riderId);
    
            if (reports.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "No reports found for the given Rider ID."
                });
            }
    
            // Return the reports if found
            res.status(200).json({
                success: true,
                message: "Reports fetched successfully.",
                data: reports
            });
    
        } catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                message: `Error fetching rider reports: ${error.message}`
            });
        }
    }

    
}




