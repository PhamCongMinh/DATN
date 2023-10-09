"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserSchema = exports.User = exports.Role = void 0;
var mongoose_1 = require("@nestjs/mongoose");
var swagger_1 = require("@shared/swagger");
var Role;
(function (Role) {
    Role["HOST"] = "host";
    Role["RENTER"] = "renter";
    Role["ADMIN"] = "admin";
})(Role = exports.Role || (exports.Role = {}));
var User = /** @class */ (function () {
    function User() {
    }
    __decorate([
        (0, swagger_1.Prop)({
            type: String,
            required: true,
            unique: true
        })
    ], User.prototype, "email");
    __decorate([
        (0, swagger_1.Prop)({
            type: String,
            required: true
        })
    ], User.prototype, "username");
    __decorate([
        (0, swagger_1.Prop)({
            type: String,
            required: true
        })
    ], User.prototype, "password");
    __decorate([
        (0, swagger_1.Prop)({
            type: String,
            required: true,
            "default": Role.RENTER
        })
    ], User.prototype, "role");
    __decorate([
        (0, swagger_1.Prop)({
            type: 'string',
            required: true
        })
    ], User.prototype, "numberPhone");
    __decorate([
        (0, swagger_1.Prop)({
            type: 'string',
            required: false
        })
    ], User.prototype, "zaloPhone");
    __decorate([
        (0, swagger_1.Prop)({
            type: 'string',
            required: false
        })
    ], User.prototype, "facebookUrl");
    __decorate([
        (0, swagger_1.Prop)({
            type: 'string',
            required: false
        })
    ], User.prototype, "avatarUrl");
    User = __decorate([
        (0, mongoose_1.Schema)({
            timestamps: {
                createdAt: 'created_at',
                updatedAt: 'updated_at'
            },
            versionKey: false,
            virtuals: true
        })
    ], User);
    return User;
}());
exports.User = User;
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
