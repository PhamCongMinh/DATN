"use strict";
exports.__esModule = true;
exports.isDevelopmentEnv = exports.EEnvKey = void 0;
var dotenv = require("dotenv");
dotenv.config();
var EEnvKey;
(function (EEnvKey) {
    EEnvKey["NODE_ENV"] = "NODE_ENV";
    EEnvKey["PORT"] = "PORT";
    EEnvKey["GLOBAL_PREFIX"] = "GLOBAL_PREFIX";
    EEnvKey["SWAGGER_PATH"] = "SWAGGER_PATH";
    EEnvKey["SWAGGER_IS_PUBLIC"] = "SWAGGER_IS_PUBLIC";
    EEnvKey["SWAGGER_HOST"] = "SWAGGER_HOST";
    EEnvKey["SWAGGER_VERSION"] = "SWAGGER_VERSION";
    EEnvKey["SWAGGER_TITLE"] = "SWAGGER_TITLE";
    EEnvKey["SWAGGER_DESC"] = "SWAGGER_DESC";
    EEnvKey["MONGO_URI"] = "MONGO_URI";
    EEnvKey["IS_WRITE_LOG"] = "IS_WRITE_LOG";
    EEnvKey["LOG_LEVEL"] = "LOG_LEVEL";
    EEnvKey["REDIS_HOST"] = "REDIS_HOST";
    EEnvKey["REDIS_PASSWORD"] = "REDIS_PASSWORD";
    EEnvKey["REDIS_PORT"] = "REDIS_PORT";
    EEnvKey["REDIS_DB_NUMBER"] = "REDIS_DB_NUMBER";
    EEnvKey["TOKEN_EXPIRE_TIME"] = "TOKEN_EXPIRE_TIME";
    EEnvKey["TOKEN_AUTH_KEY"] = "TOKEN_AUTH_KEY";
})(EEnvKey = exports.EEnvKey || (exports.EEnvKey = {}));
var isDevelopmentEnv = function () {
    var _a, _b;
    return ((_a = process.env.NODE_ENV) === null || _a === void 0 ? void 0 : _a.toUpperCase()) === 'DEVELOPMENT' ||
        ((_b = process.env.NODE_ENV) === null || _b === void 0 ? void 0 : _b.toUpperCase()) === 'STAGING';
};
exports.isDevelopmentEnv = isDevelopmentEnv;
