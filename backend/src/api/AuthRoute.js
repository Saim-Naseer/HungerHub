const router = require("express").Router();

const AuthController = require("../controllers/AuthController");
const Middleware = require("../cors/Middleware");

module.exports = () => {
  router.use(Middleware.NoAuthenticate);
  router.post("/login", AuthController.Login);

  return router;
};
