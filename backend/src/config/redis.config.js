"use strict";
exports.__esModule = true;
exports.getConfigRedisQueue = void 0;
var env_constant_1 = require("@constants/env.constant");
function getConfigRedisQueue(config) {
    return {
        host: config.get(env_constant_1.EEnvKey.REDIS_HOST),
        port: config.get(env_constant_1.EEnvKey.REDIS_PORT),
        password: config.get(env_constant_1.EEnvKey.REDIS_PASSWORD),
        db: config.get(env_constant_1.EEnvKey.REDIS_DB_NUMBER)
    };
}
exports.getConfigRedisQueue = getConfigRedisQueue;
