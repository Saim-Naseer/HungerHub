const UsersModel = require("../models/UsersModel");
const CounterService = require("./CounterService");

module.exports = {
  CreateUser: async (userData) => {
    const id = await CounterService.Get("users");
    CounterService.Inc("users");
    return UsersModel.create({ id, ...userData });
  },
  UpdateUser: async (where, obj) => {
    return UsersModel.findOneAndUpdate(where, obj);
  },
  Exists: async (query) => {
    return UsersModel.findOne(query);
  },
  GetAllUsers: async (filter) => {
    return UsersModel.find(filter);
  },
  GetUserById: async (id) => {
    return UsersModel.findOne({ id });
  },
  GetCount: async () => {
    return UsersModel.countDocuments();
  },
  DeleteUserById: async (id) => {
    return UsersModel.findOneAndDelete({ id });
  },
  VerifyUser: async (id) => {
    return UsersModel.findOneAndUpdate({ id }, { isverified: true });
  },
  GetNonVerifiedUsers: async () => {
    return UsersModel.find({ isverified: false });
  },
  GetNonVerifiedUserById: async (id) => {
    return UsersModel.find({ isverified: falss, id });
  },
};