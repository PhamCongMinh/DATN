"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ResponseTransformInterceptor = exports.createResponse = exports.defaultResponse = void 0;
var common_1 = require("@nestjs/common");
var operators_1 = require("rxjs/operators");
exports.defaultResponse = {
    success: true,
    statusCode: common_1.HttpStatus.OK,
    message: '',
    data: null,
    validatorErrors: []
};
function createResponse(data) {
    return {
        statusCode: (data === null || data === void 0 ? void 0 : data.statusCode) ? data.statusCode : common_1.HttpStatus.OK,
        data: (data === null || data === void 0 ? void 0 : data.data) || data || [],
        _metadata: (data === null || data === void 0 ? void 0 : data._metadata)
            ? __assign(__assign({}, data._metadata), { timestamp: new Date() }) : { timestamp: new Date() },
        success: true,
        message: (data === null || data === void 0 ? void 0 : data.message) ? data === null || data === void 0 ? void 0 : data.message : ''
    };
}
exports.createResponse = createResponse;
var ResponseTransformInterceptor = /** @class */ (function () {
    function ResponseTransformInterceptor(loggingService) {
        this.loggingService = loggingService;
        this.logger = this.loggingService.getLogger('Request');
    }
    ResponseTransformInterceptor.prototype.intercept = function (context, next) {
        var request = context.switchToHttp().getRequest();
        this.logger.info(request.headers, request.query, request.params);
        //todo: optimize logger body hidden password
        try {
            var body = request === null || request === void 0 ? void 0 : request.body;
            if (body && body instanceof Object) {
                body = JSON.parse(JSON.stringify(request === null || request === void 0 ? void 0 : request.body));
                if (body === null || body === void 0 ? void 0 : body.password) {
                    this.logger.info("Hidden password");
                    delete body.password;
                }
                this.logger.info("Body: ", body);
            }
        }
        catch (e) { }
        return next.handle().pipe((0, operators_1.map)(function (data) {
            var ctx = context.switchToHttp();
            var response = ctx.getResponse();
            var responseData = createResponse(data);
            response.status(responseData.statusCode);
            return createResponse(data);
        }));
    };
    ResponseTransformInterceptor = __decorate([
        (0, common_1.Injectable)()
    ], ResponseTransformInterceptor);
    return ResponseTransformInterceptor;
}());
exports.ResponseTransformInterceptor = ResponseTransformInterceptor;
