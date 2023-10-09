"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RentalNewsSchema = exports.RentalNews = void 0;
var mongoose_1 = require("@nestjs/mongoose");
var swagger_1 = require("@shared/swagger");
var RentalNews = /** @class */ (function () {
    function RentalNews() {
    }
    __decorate([
        (0, swagger_1.Prop)({
            type: 'string',
            required: true
        })
    ], RentalNews.prototype, "ownerId");
    __decorate([
        (0, swagger_1.Prop)({
            type: 'number',
            required: true
        })
    ], RentalNews.prototype, "pricePerMonth");
    __decorate([
        (0, swagger_1.Prop)({
            type: 'number',
            required: true
        })
    ], RentalNews.prototype, "area");
    __decorate([
        (0, swagger_1.Prop)({
            type: 'string',
            required: true
        })
    ], RentalNews.prototype, "city");
    __decorate([
        (0, swagger_1.Prop)({
            type: 'string',
            required: true
        })
    ], RentalNews.prototype, "district");
    __decorate([
        (0, swagger_1.Prop)({
            type: 'string',
            required: true
        })
    ], RentalNews.prototype, "commune");
    __decorate([
        (0, swagger_1.Prop)({
            type: 'string',
            required: true
        })
    ], RentalNews.prototype, "street");
    __decorate([
        (0, swagger_1.Prop)({
            type: 'number',
            required: true
        })
    ], RentalNews.prototype, "houseNumber");
    __decorate([
        (0, swagger_1.Prop)({
            type: 'string',
            required: true
        })
    ], RentalNews.prototype, "specificAddress");
    __decorate([
        (0, swagger_1.Prop)({
            type: 'string',
            required: true
        })
    ], RentalNews.prototype, "title");
    __decorate([
        (0, swagger_1.Prop)({
            type: 'string',
            required: true
        })
    ], RentalNews.prototype, "description");
    __decorate([
        (0, swagger_1.Prop)({
            type: Array,
            required: false
        })
    ], RentalNews.prototype, "imageUrl");
    RentalNews = __decorate([
        (0, mongoose_1.Schema)({
            timestamps: {
                createdAt: 'created_at',
                updatedAt: 'updated_at'
            },
            versionKey: false,
            virtuals: true
        })
    ], RentalNews);
    return RentalNews;
}());
exports.RentalNews = RentalNews;
exports.RentalNewsSchema = mongoose_1.SchemaFactory.createForClass(RentalNews);
