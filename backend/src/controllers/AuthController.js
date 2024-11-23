const fs = require("fs");
const Status = require("../constants/Status.json");
const jwt = require("jsonwebtoken");

const Logger = require("../utils/Logger");
const ErrorManager = require("../../errors/error-manager");

const logger = new Logger();

const { JwtKey, environment } = require("../../config");

module.exports = {
  Login: async (req, res) => {
    try {
      const { username, password } = req.body;
      if (!username || !password || username) {
        return ErrorManager.getError(res, "WRONG_CREDENTIALS");
      }

      const logintoken = jwt.sign({ emis, level: School.level }, JwtKey);

      return res.json({
        status: Status.SUCCESS,
        message: "Login successful.",
        data: {
          logintoken,
        },
      });
    } catch (e) {
      ErrorManager.getError(res, "UNKNOWN_ERROR");
      logger.error(e.message + "\n" + e.stack);
      if (environment === "prod") throw e;
    }
  },
};
