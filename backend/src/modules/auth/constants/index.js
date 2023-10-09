"use strict";
exports.__esModule = true;
exports.AuthErrorMessage = exports.saltBcrypt = void 0;
exports.saltBcrypt = 12;
var AuthErrorMessage;
(function (AuthErrorMessage) {
    AuthErrorMessage["NoExist"] = "Account does not exist";
    AuthErrorMessage["InvalidUser"] = "Opps! Your email or password is not correct. Please try again";
    AuthErrorMessage["UserExist"] = "Email exist. Please choose another email for register";
    AuthErrorMessage["PasswordNotMatch"] = "Password and confirm password is not match. Please try again";
})(AuthErrorMessage = exports.AuthErrorMessage || (exports.AuthErrorMessage = {}));
