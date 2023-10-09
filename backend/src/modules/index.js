"use strict";
exports.__esModule = true;
exports.MODULES = void 0;
var auth_module_1 = require("@modules/auth/auth.module");
var rent_out_module_1 = require("@modules/rent-out/rent-out.module");
exports.MODULES = [auth_module_1.AuthModule, rent_out_module_1["default"]];
