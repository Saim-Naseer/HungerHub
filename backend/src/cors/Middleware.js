const ErrorManager = require("../../errors/error-manager");
const jwt = require("jsonwebtoken");
const { JwtKey } = require("../../config");
module.exports = {
  NoAuthenticate: async (req, res, next) => {
    next();
  },
  UserAuth: async (req, res, next) => {
    try {
      let token = req.headers["x-access-token"] || req.headers["authorization"];
      if (token && token.split(" ").length !== 1) token = token.split(" ")[1];

      if (!token) {
        return ErrorManager.getError(res, "UNAUTHORIZED");
      }
      const decoded = jwt.verify(token, JwtKey);
      const Exists = true;
      //      const Exists = await UserService.Exists({ id: decoded.id });

      if (!Exists) {
        return ErrorManager.getError(res, "SCHOOL_NOT_FOUND");
      }

      req.user = Exists;

      next();
    } catch (ex) {
      return ErrorManager.getError(res, "UNAUTHORIZED");
    }
  },
  AdminAuth: async (req, res, next) => {
    try {
      let token = req.headers["x-access-token"] || req.headers["authorization"];
      if (token && token.split(" ").length !== 1) token = token.split(" ")[1];

      if (!token) {
        return ErrorManager.getError(res, "UNAUTHORIZED");
      }
      const decoded = jwt.verify(token, JwtKey);
      if (decoded?.level < 3) {
        return ErrorManager.getError(res, "UNAUTHORIZED");
      }
      req.user = decoded;
      next();
    } catch (ex) {
      return ErrorManager.getError(res, "UNAUTHORIZED");
    }
  },
};
