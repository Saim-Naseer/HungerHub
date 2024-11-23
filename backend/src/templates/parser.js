const handlebars = require("handlebars");
const fs = require("fs");

const parseTemplate = function (template, replacements) {
  const source = fs.readFileSync(__dirname + template, "utf-8").toString();
  const t = handlebars.compile(source);
  const htmlToSend = t(replacements);
  return htmlToSend;
};

const TEMPLATES = {
  EMAIL: {
    VERIFY_EMAIL: "/verification_email.html",
    WELCOME_EMAIL: "/welcome_email.html",
    FORGETPASS_EMAIL: "/forgetpass_email.html",
  },
};

module.exports = {
  parseTemplate,
  TEMPLATES,
};
