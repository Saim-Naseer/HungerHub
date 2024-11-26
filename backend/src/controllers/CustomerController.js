
const CustomerModel = require('../models/Customer')

module.exports = {
    Create: async (req,res) => {

        try{

            const tayyab = new CustomerModel({
                Customer_id:1,
                email:"tayyab@getMaxListeners.com",
                pwd:"1234",
                name:"tayyab",
                location:"paki_thati"
            })
    
            await tayyab.save()
    
            res.send("done")
    

        }catch(e){

            res.send("not done")
        }
    }
}