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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
exports.__esModule = true;
exports.ResponsePaginationPayload = exports.PaginationMetadata = exports.ResponsePayload = exports.ApiOkResponsePayload = exports.EApiOkResponsePayload = exports.Prop = exports.ApiBulkDeleteOperation = exports.ApiDeleteOperation = exports.ApiUpdateOperation = exports.ApiCreateOperation = exports.ApiRetrieveOperation = exports.ApiListOperation = exports.ApiEnumProperty = exports.enumProperty = exports.enumToObj = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var swagger_1 = require("@nestjs/swagger");
__exportStar(require("@nestjs/swagger"), exports);
function enumToObj(enumVariable) {
    var enumValues = Object.values(enumVariable);
    var hLen = enumValues.length / 2;
    var object = {};
    for (var i = 0; i < hLen; i++) {
        object[enumValues[i]] = enumValues[hLen + i];
    }
    return object;
}
exports.enumToObj = enumToObj;
function enumProperty(options) {
    var _a;
    var obj = enumToObj(options["enum"]);
    var enumValues = Object.values(obj);
    return __assign(__assign({ example: enumValues[0] }, options), { "enum": enumValues, description: ((_a = options.description) !== null && _a !== void 0 ? _a : '') + ': ' + JSON.stringify(obj) });
}
exports.enumProperty = enumProperty;
var createApiOperation = function (defaultOptions) {
    return function (options) {
        return (0, swagger_1.ApiOperation)(__assign(__assign({}, defaultOptions), options));
    };
};
var ApiEnumProperty = function (options) {
    return (0, swagger_1.ApiProperty)(enumProperty(options));
};
exports.ApiEnumProperty = ApiEnumProperty;
exports.ApiListOperation = createApiOperation({
    summary: 'List all'
});
exports.ApiRetrieveOperation = createApiOperation({
    summary: 'Get data 1 record'
});
exports.ApiCreateOperation = createApiOperation({
    summary: 'Create new record'
});
exports.ApiUpdateOperation = createApiOperation({
    summary: 'Edit record'
});
exports.ApiDeleteOperation = createApiOperation({
    summary: 'Delete record'
});
exports.ApiBulkDeleteOperation = createApiOperation({
    summary: 'Delete many record'
});
function Prop(optionProp, optionApiProperty) {
    return (0, common_1.applyDecorators)((0, mongoose_1.Prop)(optionProp), (0, swagger_1.ApiProperty)(optionApiProperty));
}
exports.Prop = Prop;
var EApiOkResponsePayload;
(function (EApiOkResponsePayload) {
    EApiOkResponsePayload["ARRAY"] = "array";
    EApiOkResponsePayload["OBJECT"] = "object";
})(EApiOkResponsePayload = exports.EApiOkResponsePayload || (exports.EApiOkResponsePayload = {}));
var ApiOkResponsePayload = function (dto, type, withPagination) {
    if (type === void 0) { type = EApiOkResponsePayload.ARRAY; }
    if (withPagination === void 0) { withPagination = false; }
    var data = type === EApiOkResponsePayload.ARRAY
        ? {
            type: EApiOkResponsePayload.ARRAY,
            items: { $ref: (0, swagger_1.getSchemaPath)(dto) }
        }
        : {
            type: EApiOkResponsePayload.OBJECT,
            properties: {
                data: { $ref: (0, swagger_1.getSchemaPath)(dto) }
            }
        };
    var properties = type === EApiOkResponsePayload.ARRAY
        ? {
            properties: {
                data: data
            }
        }
        : __assign({}, data);
    return (0, common_1.applyDecorators)((0, swagger_1.ApiExtraModels)(!withPagination ? ResponsePayload : ResponsePaginationPayload, dto), (0, swagger_1.ApiOkResponse)({
        schema: {
            allOf: [
                {
                    $ref: (0, swagger_1.getSchemaPath)(!withPagination ? ResponsePayload : ResponsePaginationPayload)
                },
                __assign({}, properties),
            ]
        }
    }));
};
exports.ApiOkResponsePayload = ApiOkResponsePayload;
var ResponsePayload = /** @class */ (function () {
    function ResponsePayload() {
    }
    __decorate([
        (0, exports.ApiEnumProperty)({ "enum": common_1.HttpStatus, example: common_1.HttpStatus.OK })
    ], ResponsePayload.prototype, "statusCode");
    __decorate([
        (0, swagger_1.ApiProperty)()
    ], ResponsePayload.prototype, "data");
    __decorate([
        (0, swagger_1.ApiProperty)()
    ], ResponsePayload.prototype, "_metadata");
    __decorate([
        (0, swagger_1.ApiProperty)({ description: 'If success = fail, this is message error' })
    ], ResponsePayload.prototype, "message");
    __decorate([
        (0, swagger_1.ApiProperty)({ description: 'Check is success api' })
    ], ResponsePayload.prototype, "success");
    __decorate([
        (0, swagger_1.ApiProperty)({ description: 'Validate error with input data' })
    ], ResponsePayload.prototype, "validatorErrors");
    return ResponsePayload;
}());
exports.ResponsePayload = ResponsePayload;
var PaginationMetadata = /** @class */ (function () {
    function PaginationMetadata() {
    }
    __decorate([
        (0, swagger_1.ApiProperty)()
    ], PaginationMetadata.prototype, "totalDocs");
    __decorate([
        (0, swagger_1.ApiProperty)()
    ], PaginationMetadata.prototype, "limit");
    __decorate([
        (0, swagger_1.ApiProperty)()
    ], PaginationMetadata.prototype, "page");
    __decorate([
        (0, swagger_1.ApiProperty)()
    ], PaginationMetadata.prototype, "totalPages");
    return PaginationMetadata;
}());
exports.PaginationMetadata = PaginationMetadata;
var ResponsePaginationPayload = /** @class */ (function (_super) {
    __extends(ResponsePaginationPayload, _super);
    function ResponsePaginationPayload() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, swagger_1.ApiProperty)({ type: PaginationMetadata })
    ], ResponsePaginationPayload.prototype, "_metadata");
    return ResponsePaginationPayload;
}(ResponsePayload));
exports.ResponsePaginationPayload = ResponsePaginationPayload;
