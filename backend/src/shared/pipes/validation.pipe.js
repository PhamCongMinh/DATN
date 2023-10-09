"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.BodyValidationPipe = void 0;
var common_1 = require("@nestjs/common");
var exception_1 = require("@shared//exception");
var BodyValidationPipe = /** @class */ (function (_super) {
    __extends(BodyValidationPipe, _super);
    function BodyValidationPipe() {
        var _this = _super.call(this, {
            transform: true,
            transformOptions: { enableImplicitConversion: true },
            skipMissingProperties: false,
            exceptionFactory: function (errs) {
                return new exception_1.BadRequestException({
                    message: "Validation errors on these fields: ".concat(_this.getMessageFromErrs(errs)),
                    statusCode: common_1.HttpStatus.BAD_REQUEST,
                    validatorErrors: _this.getPropertyAndContraints(errs)
                });
            }
        }) || this;
        return _this;
    }
    BodyValidationPipe.prototype.getMessageFromErrs = function (errs, parent) {
        var _this = this;
        if (parent === void 0) { parent = null; }
        return errs
            .map(function (e) {
            var current = parent ? "".concat(parent, ".").concat(e.property) : "".concat(e.property); //`${parent ? `${parent}.` : ''}${e.property}`;
            if (e.children && e.children.length > 0) {
                return "".concat(_this.getMessageFromErrs(e.children, current));
            }
            return current;
        })
            .join(', ');
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    BodyValidationPipe.prototype.getPropertyAndContraints = function (errs) {
        var _this = this;
        var details = [];
        errs.forEach(function (e) {
            if (e.children && e.children.length > 0) {
                _this.getPropertyAndContraints(e.children).forEach(function (e) {
                    return details.push(e);
                });
            }
            else {
                details.push({
                    property: e.property,
                    contraints: Object.values(e.constraints)
                });
            }
        });
        return details;
    };
    return BodyValidationPipe;
}(common_1.ValidationPipe));
exports.BodyValidationPipe = BodyValidationPipe;
