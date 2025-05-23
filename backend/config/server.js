const express = require("express");
const fileUpload = require("express-fileupload")
const bodyParser = require("body-parser");
var cors = require("cors");
const Logger = require("../src/utils/Logger");

const ErrorManager = require("../errors/error-manager");

const logger = new Logger();

const { port } = require("../config");
const app = express();
const moment = require("moment");
const momenttz = require("moment-timezone");

moment.tz.setDefault("Asia/Karachi");

app.listen(port, "127.0.0.1", () => {
  logger.info(`Working with port ${port}`);
});

app.use(cors());

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use(bodyParser.json({ limit: "10mb" }));

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return ErrorManager.getError(res, "INVALID_ARGUMENTS");
  } else {
    next(err);
  }
});

app.use(fileUpload())

const AuthRoute = require("../src/api/AuthRoute")();
app.use("/auth/", AuthRoute);

const AdminRoute = require("../src/api/AdminRoute")();
app.use("/admin/", AdminRoute);

const CustomerRoute = require("../src/api/CustomerRoute")();
app.use("/customer/",CustomerRoute)

const RestaurantRoute = require("../src/api/RestaurantRoute")();
app.use("/restaurant/",RestaurantRoute)

const RiderRoute = require("../src/api/RiderRoute")();
app.use("/rider/",RiderRoute)


// 404 error
app.get("*", async (req, res) => {
  return ErrorManager.getError(res, "PAGE_NOT_FOUND");
});

app.post("*", async (req, res) => {
  return ErrorManager.getError(res, "PAGE_NOT_FOUND");
});
