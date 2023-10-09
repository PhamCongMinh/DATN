"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var _a;
exports.__esModule = true;
exports.ConfigurationModule = void 0;
var common_1 = require("@nestjs/common");
var config_1 = require("@nestjs/config");
var Joi = require("joi");
var env_constant_1 = require("@constants/env.constant");
var ConfigurationModule = /** @class */ (function () {
    function ConfigurationModule() {
    }
    ConfigurationModule = __decorate([
        (0, common_1.Global)(),
        (0, common_1.Module)({
            imports: [
                config_1.ConfigModule.forRoot({
                    envFilePath: ".env",
                    validationSchema: Joi.object((_a = {},
                        // nestjs
                        _a[env_constant_1.EEnvKey.NODE_ENV] = Joi.string().valid('development', 'production'),
                        _a[env_constant_1.EEnvKey.PORT] = Joi.number()["default"](3000),
                        _a[env_constant_1.EEnvKey.GLOBAL_PREFIX] = Joi.string(),
                        _a[env_constant_1.EEnvKey.SWAGGER_PATH] = Joi.string(),
                        _a)),
                    load: []
                }),
            ],
            providers: [config_1.ConfigService],
            exports: [config_1.ConfigService]
        })
    ], ConfigurationModule);
    return ConfigurationModule;
}());
exports.ConfigurationModule = ConfigurationModule;
