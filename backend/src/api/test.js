const Status = require("../constants/Status.json");
const UserService = require("../services/UserService");
const jwt = require("jsonwebtoken");
const Logger = require("../utils/Logger");
const ErrorManager = require("../../errors/error-manager");

const logger = new Logger();
const { createOTP } = require("../utils/utils");
const { JwtKey, environment } = require("../../config");
const EmailService = require("../services/EmailService");
const bcrypt = require("bcrypt");

module.exports = {
  GetInfo: async (req, res) => {
    try {
      if (!req.user.isEmailVerified) 
      {
        const { hash, otp } = createOTP(req.user.id);

        await EmailService.SendVerifyEmail(req.user.email, req.user.name, otp);

        return res.json({
          status: Status.SUCCESS,
          message: "Email not verified",
          data: { hash },
        });
      }
      const User = req.user.toJSON();
      delete User.password;

      return res.json({
        status: Status.SUCCESS,
        message: "User info.",
        data: User,
      });
    } catch (e) {
      ErrorManager.getError(res, "UNKNOWN_ERROR");
      logger.error(e.message + "\n" + e.stack);
      if (environment === "prod") throw e;
    }
  },
  UpdateAddress: async (req, res) => {
    try {
      const { country, city, address } = req.body;
      if (!country || !city || !address) {
        return ErrorManager.getError(res, "INCOMPLETE_ARGS");
      }

      req.user.country = country;
      req.user.city = city;
      req.user.address = address;

      await req.user.save();

      const data = req.user.toJSON();
      delete data.password;

      return res.json({
        status: Status.SUCCESS,
        message: "Address updated.",
        data,
      });
    } catch (e) {
      ErrorManager.getError(res, "UNKNOWN_ERROR");
      logger.error(e.message + "\n" + e.stack);
      if (environment === "prod") throw e;
    }
  },
  UpdateReligion: async (req, res) => {
    try {
      const { religion, cast, sect } = req.body;
      if (!religion || !cast || !sect) {
        return ErrorManager.getError(res, "INCOMPLETE_ARGS");
      }

      req.user.religion = religion;
      req.user.cast = cast;
      req.user.sect = sect;

      await req.user.save();

      const data = req.user.toJSON();
      delete data.password;

      return res.json({
        status: Status.SUCCESS,
        message: "Religion updated.",
        data,
      });
    } catch (e) {
      ErrorManager.getError(res, "UNKNOWN_ERROR");
      logger.error(e.message + "\n" + e.stack);
      if (environment === "prod") throw e;
    }
  },
  UpdateEducation: async (req, res) => {
    try {
      const { education } = req.body;
      if (!education) {
        return ErrorManager.getError(res, "INCOMPLETE_ARGS");
      }

      req.user.education = education;

      await req.user.save();

      const data = req.user.toJSON();
      delete data.password;

      return res.json({
        status: Status.SUCCESS,
        message: "Education updated.",
        data,
      });
    } catch (e) {
      ErrorManager.getError(res, "UNKNOWN_ERROR");
      logger.error(e.message + "\n" + e.stack);
      if (environment === "prod") throw e;
    }
  },
  UpdateOccupation: async (req, res) => {
    try {
      const { occupation, monthlyIncome, jobDetail } = req.body;
      if (!occupation || !monthlyIncome || !jobDetail) {
        return ErrorManager.getError(res, "INCOMPLETE_ARGS");
      }

      if (isNaN(monthlyIncome)) {
        return ErrorManager.getError(res, "INVALID_NUMBER");
      }

      req.user.occupation = occupation;
      req.user.income = monthlyIncome;
      req.user.jobinfo = jobDetail;

      await req.user.save();

      const data = req.user.toJSON();
      delete data.password;
      return res.json({
        status: Status.SUCCESS,
        message: "Occupation updated.",
        data,
      });
    } catch (e) {
      ErrorManager.getError(res, "UNKNOWN_ERROR");
      logger.error(e.message + "\n" + e.stack);
      if (environment === "prod") throw e;
    }
  },
  UpdateMaritalStatus: async (req, res) => {
    try {
      const { marital } = req.body;
      if (!marital) {
        return ErrorManager.getError(res, "INCOMPLETE_ARGS");
      }

      req.user.marital = marital;
      await req.user.save();

      const data = req.user.toJSON();
      delete data.password;

      return res.json({
        status: Status.SUCCESS,
        message: "marital status updated.",
        data,
      });
    } catch (e) {
      ErrorManager.getError(res, "UNKNOWN_ERROR");
      logger.error(e.message + "\n" + e.stack);
      if (environment === "prod") throw e;
    }
  },
};