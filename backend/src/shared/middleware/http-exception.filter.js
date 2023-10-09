"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HttpExceptionFilter = void 0;
var common_1 = require("@nestjs/common");
var exc = require("@shared//exception");
var HttpExceptionFilter = /** @class */ (function () {
    function HttpExceptionFilter(loggingService) {
        this.loggingService = loggingService;
        this.logger = this.loggingService.getLogger('http-exception');
    }
    HttpExceptionFilter.prototype["catch"] = function (exception, host) {
        var ctx = host.switchToHttp();
        var response = ctx.getResponse();
        // const request = ctx.getRequest();
        // const status = exception.getStatus();
        var excResponse = exception.getResponse();
        // this.logger.info(request.headers, request.query, request.params, request.body);
        this.logger.warn(excResponse);
        if (typeof excResponse !== 'object' ||
            !excResponse.hasOwnProperty('success')) {
            var newDataResponse = typeof excResponse === 'object'
                ? excResponse
                : { message: excResponse };
            newDataResponse = newDataResponse === null || newDataResponse === void 0 ? void 0 : newDataResponse.message;
            excResponse = new exc.BadRequestException({
                statusCode: excResponse.statusCode
                    ? excResponse.statusCode
                    : common_1.HttpStatus.BAD_REQUEST,
                data: excResponse.data ? excResponse.data : null,
                validatorErrors: (excResponse === null || excResponse === void 0 ? void 0 : excResponse.validatorErrors)
                    ? excResponse.validatorErrors
                    : [],
                message: typeof newDataResponse === 'string'
                    ? newDataResponse
                    : 'unknown message'
            }).getResponse();
        }
        response.status(excResponse.statusCode).json(excResponse);
    };
    HttpExceptionFilter = __decorate([
        (0, common_1.Catch)(common_1.HttpException)
    ], HttpExceptionFilter);
    return HttpExceptionFilter;
}());
exports.HttpExceptionFilter = HttpExceptionFilter;
