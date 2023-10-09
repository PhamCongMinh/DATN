"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UnknownExceptionsFilter = void 0;
var common_1 = require("@nestjs/common");
var UnknownExceptionsFilter = /** @class */ (function () {
    function UnknownExceptionsFilter(loggingService, configService) {
        this.loggingService = loggingService;
        this.configService = configService;
        this.logger = this.loggingService.getLogger('unknown-exception');
    }
    UnknownExceptionsFilter.prototype["catch"] = function (exception, host) {
        var ctx = host.switchToHttp();
        var response = ctx.getResponse();
        this.logger.error(exception);
        var defaultResponse = {
            data: null,
            validatorErrors: [],
            statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            message: 'unknown exception',
            success: false
        };
        response.status(defaultResponse.statusCode).json(defaultResponse);
    };
    UnknownExceptionsFilter = __decorate([
        (0, common_1.Catch)()
    ], UnknownExceptionsFilter);
    return UnknownExceptionsFilter;
}());
exports.UnknownExceptionsFilter = UnknownExceptionsFilter;
