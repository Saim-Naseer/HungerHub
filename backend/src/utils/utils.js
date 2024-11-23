const { Attendance } = require("../../config");

function capitalizeString(string) {
  if (string) {
    string = String(string);
    return string.charAt(0).toUpperCase() + string.slice(1);
  } else return string;
}

function isEmail(email) {
  var emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  if (email !== "" && email.match(emailFormat)) {
    return true;
  }
  return false;
}
function createOTP(id, extra = {}) {
  const otp = otpGenerator.generate(6, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });

  const hash = jwt.sign({ id, otp, ...extra }, JwtKey, {
    expiresIn: Limits.OTP,
  });

  return { hash, otp };
}
function replaceVariables(message, variables) {
  let newMessage = message;
  for (const key in variables) {
    newMessage = replaceAll(newMessage, `{{${key}}}`, variables[key]);
  }
  return newMessage;
}

module.exports = {
  capitalizeString,
  isEmail,
  createOTP,
  replaceVariables,
};
