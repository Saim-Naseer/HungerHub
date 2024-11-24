const fs = require("fs");
const Status = require("../constants/Status.json");
const ErrorManager = require("../../errors/error-manager");
const CounterModel = require('../models/Customer')

module.exports = {
  Create: async(req,res) => {
    try{

      const customer1 = new CounterModel({
        Customer_id:1,
        email:'saim@gmail.com',
        pwd:'12345',
        name:'saim',
        location:'askari11'
      })

      await customer1.save()

      res.status(200).send("successful")

    } catch(e)
    {
      ErrorManager.getError(res, "UNKNOWN_ERROR");
      if (environment === "prod") throw e;
    }
  },
  Login: async (req, res) => {
    try {
      const { username, password } = req.body;
      if (!username || !password || username) {
        return ErrorManager.getError(res, "WRONG_CREDENTIALS");
      }

      return res.json({
        status: Status.SUCCESS,
        message: "Login successful.",
        data: {
          logintoken,
        },
      });
    } catch (e) {
      ErrorManager.getError(res, "UNKNOWN_ERROR");
      if (environment === "prod") throw e;
    }
  },
};
