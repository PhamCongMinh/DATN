"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.AuthController = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var auth_guard_1 = require("@shared/guards/auth.guard");
var description_api_1 = require("@modules/auth/constants/description-api");
var AuthController = /** @class */ (function () {
    function AuthController(authService, loggerService) {
        this.authService = authService;
        this.loggerService = loggerService;
        this.loggerService.getLogger('AuthController');
    }
    AuthController.prototype.register = function (registerDto) {
        return this.authService.register(registerDto);
    };
    AuthController.prototype.login = function (loginDto) {
        return this.authService.login(loginDto);
    };
    AuthController.prototype.logout = function () {
        return {
            message: 'success'
        };
    };
    __decorate([
        (0, common_1.Post)('register'),
        (0, swagger_1.ApiOperation)({ description: description_api_1.ApiAuthDescription.register }),
        __param(0, (0, common_1.Body)())
    ], AuthController.prototype, "register");
    __decorate([
        (0, common_1.Post)('login'),
        (0, swagger_1.ApiOperation)({ description: description_api_1.ApiAuthDescription.login }),
        __param(0, (0, common_1.Body)())
    ], AuthController.prototype, "login");
    __decorate([
        (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard),
        (0, swagger_1.ApiBearerAuth)('jwt'),
        (0, common_1.Post)('logout'),
        (0, swagger_1.ApiOperation)({ description: description_api_1.ApiAuthDescription.logout })
    ], AuthController.prototype, "logout");
    AuthController = __decorate([
        (0, swagger_1.ApiTags)('Auth'),
        (0, common_1.Controller)('auth')
    ], AuthController);
    return AuthController;
}());
exports.AuthController = AuthController;
