"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UpdateRentalNewsDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var UpdateRentalNewsDto = /** @class */ (function () {
    function UpdateRentalNewsDto() {
    }
    __decorate([
        (0, swagger_1.ApiPropertyOptional)(),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsNumber)(),
        (0, class_validator_1.Min)(100000)
    ], UpdateRentalNewsDto.prototype, "pricePerMonth");
    __decorate([
        (0, swagger_1.ApiPropertyOptional)(),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsNumber)(),
        (0, class_validator_1.Min)(1)
    ], UpdateRentalNewsDto.prototype, "area");
    __decorate([
        (0, swagger_1.ApiPropertyOptional)(),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsString)()
    ], UpdateRentalNewsDto.prototype, "city");
    __decorate([
        (0, swagger_1.ApiPropertyOptional)(),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsString)()
    ], UpdateRentalNewsDto.prototype, "district");
    __decorate([
        (0, swagger_1.ApiPropertyOptional)(),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsString)()
    ], UpdateRentalNewsDto.prototype, "commune");
    __decorate([
        (0, swagger_1.ApiPropertyOptional)(),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsString)()
    ], UpdateRentalNewsDto.prototype, "street");
    __decorate([
        (0, swagger_1.ApiPropertyOptional)(),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsNumber)(),
        (0, class_validator_1.Min)(1)
    ], UpdateRentalNewsDto.prototype, "houseNumber");
    __decorate([
        (0, swagger_1.ApiPropertyOptional)(),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsString)()
    ], UpdateRentalNewsDto.prototype, "specificAddress");
    __decorate([
        (0, swagger_1.ApiPropertyOptional)(),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsString)()
    ], UpdateRentalNewsDto.prototype, "title");
    __decorate([
        (0, swagger_1.ApiPropertyOptional)(),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsString)()
    ], UpdateRentalNewsDto.prototype, "description");
    __decorate([
        (0, swagger_1.ApiPropertyOptional)(),
        (0, class_validator_1.IsOptional)()
    ], UpdateRentalNewsDto.prototype, "imageUrl");
    return UpdateRentalNewsDto;
}());
exports.UpdateRentalNewsDto = UpdateRentalNewsDto;
