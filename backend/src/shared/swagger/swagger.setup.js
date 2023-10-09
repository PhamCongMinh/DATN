"use strict";
exports.__esModule = true;
exports.initSwagger = void 0;
var swagger_1 = require("@nestjs/swagger");
var env_constant_1 = require("@constants/env.constant");
function initSwagger(app, config) {
    var swaggerConfig = {
        isPublic: config.get(env_constant_1.EEnvKey.SWAGGER_IS_PUBLIC) === 'true',
        title: config.get(env_constant_1.EEnvKey.SWAGGER_TITLE),
        description: config.get(env_constant_1.EEnvKey.SWAGGER_DESC),
        version: config.get(env_constant_1.EEnvKey.SWAGGER_VERSION),
        server: config.get(env_constant_1.EEnvKey.SWAGGER_HOST)
    };
    if (!swaggerConfig.isPublic)
        return;
    var configSwagger = new swagger_1.DocumentBuilder()
        .setTitle(swaggerConfig.title)
        .setDescription(swaggerConfig.description)
        .setVersion(swaggerConfig.version)
        .addServer(swaggerConfig.server, 'Host')
        .setExternalDoc('Postman Collection', '/docs-json')
        .addBearerAuth({
        description: 'Please enter token in following format: ',
        name: 'Authorization',
        bearerFormat: 'Bearer',
        scheme: 'Bearer',
        type: 'http',
        "in": 'Header'
    }, 'jwt')
        .build();
    var document = swagger_1.SwaggerModule.createDocument(app, configSwagger);
    swagger_1.SwaggerModule.setup('/docs', app, document);
}
exports.initSwagger = initSwagger;
