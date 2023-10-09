"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var RentalNews_1 = require("@models/entities/RentalNews");
var rent_out_service_1 = require("@modules/rent-out/rent-out.service");
var logger_module_1 = require("@shared/modules/loggers/logger.module");
var RentalNews_repository_1 = require("@models/repositories/RentalNews.repository");
var rent_out_controller_1 = require("@modules/rent-out/rent-out.controller");
var platform_express_1 = require("@nestjs/platform-express");
var RentOutModule = /** @class */ (function () {
    function RentOutModule() {
    }
    RentOutModule = __decorate([
        (0, common_1.Module)({
            imports: [
                mongoose_1.MongooseModule.forFeature([
                    {
                        name: RentalNews_1.RentalNews.name,
                        schema: RentalNews_1.RentalNewsSchema
                    },
                ]),
                platform_express_1.MulterModule.registerAsync({
                    useFactory: function () { return ({
                        dest: '../../upload'
                    }); }
                }),
                logger_module_1.LoggingModule,
            ],
            controllers: [rent_out_controller_1.RentOutController],
            providers: [rent_out_service_1.RentOutService, RentalNews_repository_1["default"]],
            exports: [rent_out_service_1.RentOutService]
        })
    ], RentOutModule);
    return RentOutModule;
}());
exports["default"] = RentOutModule;
