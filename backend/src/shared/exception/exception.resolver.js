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
exports.__esModule = true;
exports.FailedDependency = exports.PayloadTooLarge = exports.TemporaryRedirect = exports.UnsupportedMediaType = exports.Conflict = exports.NotAcceptable = exports.MethodNotAllowed = exports.NotFound = exports.Forbidden = exports.Unauthorized = exports.BusinessException = exports.BadRequestException = exports.Exception = exports.BaseException = void 0;
var common_1 = require("@nestjs/common");
var request_response_interceptor_1 = require("@shared/interceptors/request-response.interceptor");
var BaseException = /** @class */ (function (_super) {
    __extends(BaseException, _super);
    function BaseException(partial, statusCode) {
        var payload = __assign(__assign(__assign({}, request_response_interceptor_1.defaultResponse), { statusCode: (partial === null || partial === void 0 ? void 0 : partial.statusCode) ? partial.statusCode : statusCode, message: '' }), partial);
        payload.success = payload.statusCode < 400;
        return _super.call(this, payload, statusCode) || this;
    }
    return BaseException;
}(common_1.HttpException));
exports.BaseException = BaseException;
/**
 * response to client an error
 * @example
 * throw new exc.Exception<number>({
    message: 'Not found user id',
  });
 */
var Exception = /** @class */ (function (_super) {
    __extends(Exception, _super);
    function Exception(payload, statusCode) {
        if (statusCode === void 0) { statusCode = common_1.HttpStatus.INTERNAL_SERVER_ERROR; }
        return _super.call(this, payload, statusCode) || this;
    }
    return Exception;
}(BaseException));
exports.Exception = Exception;
var BadRequestException = /** @class */ (function (_super) {
    __extends(BadRequestException, _super);
    function BadRequestException(payload) {
        return _super.call(this, payload, common_1.HttpStatus.BAD_REQUEST) || this;
    }
    return BadRequestException;
}(BaseException));
exports.BadRequestException = BadRequestException;
var BusinessException = /** @class */ (function (_super) {
    __extends(BusinessException, _super);
    function BusinessException(payload) {
        return _super.call(this, payload, common_1.HttpStatus.INTERNAL_SERVER_ERROR) || this;
    }
    return BusinessException;
}(BaseException));
exports.BusinessException = BusinessException;
var Unauthorized = /** @class */ (function (_super) {
    __extends(Unauthorized, _super);
    function Unauthorized(payload) {
        return _super.call(this, payload, common_1.HttpStatus.UNAUTHORIZED) || this;
    }
    return Unauthorized;
}(BaseException));
exports.Unauthorized = Unauthorized;
var Forbidden = /** @class */ (function (_super) {
    __extends(Forbidden, _super);
    function Forbidden(payload) {
        return _super.call(this, payload, common_1.HttpStatus.FORBIDDEN) || this;
    }
    return Forbidden;
}(BaseException));
exports.Forbidden = Forbidden;
var NotFound = /** @class */ (function (_super) {
    __extends(NotFound, _super);
    function NotFound(payload) {
        return _super.call(this, payload, common_1.HttpStatus.NOT_FOUND) || this;
    }
    return NotFound;
}(BaseException));
exports.NotFound = NotFound;
var MethodNotAllowed = /** @class */ (function (_super) {
    __extends(MethodNotAllowed, _super);
    function MethodNotAllowed(payload) {
        return _super.call(this, payload, common_1.HttpStatus.METHOD_NOT_ALLOWED) || this;
    }
    return MethodNotAllowed;
}(BaseException));
exports.MethodNotAllowed = MethodNotAllowed;
var NotAcceptable = /** @class */ (function (_super) {
    __extends(NotAcceptable, _super);
    function NotAcceptable(payload) {
        return _super.call(this, payload, common_1.HttpStatus.NOT_ACCEPTABLE) || this;
    }
    return NotAcceptable;
}(BaseException));
exports.NotAcceptable = NotAcceptable;
var Conflict = /** @class */ (function (_super) {
    __extends(Conflict, _super);
    function Conflict(payload) {
        return _super.call(this, payload, common_1.HttpStatus.CONFLICT) || this;
    }
    return Conflict;
}(BaseException));
exports.Conflict = Conflict;
var UnsupportedMediaType = /** @class */ (function (_super) {
    __extends(UnsupportedMediaType, _super);
    function UnsupportedMediaType(payload) {
        return _super.call(this, payload, common_1.HttpStatus.UNSUPPORTED_MEDIA_TYPE) || this;
    }
    return UnsupportedMediaType;
}(BaseException));
exports.UnsupportedMediaType = UnsupportedMediaType;
var TemporaryRedirect = /** @class */ (function (_super) {
    __extends(TemporaryRedirect, _super);
    function TemporaryRedirect(payload) {
        return _super.call(this, payload, common_1.HttpStatus.TEMPORARY_REDIRECT) || this;
    }
    return TemporaryRedirect;
}(BaseException));
exports.TemporaryRedirect = TemporaryRedirect;
var PayloadTooLarge = /** @class */ (function (_super) {
    __extends(PayloadTooLarge, _super);
    function PayloadTooLarge(payload) {
        return _super.call(this, payload, common_1.HttpStatus.PAYLOAD_TOO_LARGE) || this;
    }
    return PayloadTooLarge;
}(BaseException));
exports.PayloadTooLarge = PayloadTooLarge;
var FailedDependency = /** @class */ (function (_super) {
    __extends(FailedDependency, _super);
    function FailedDependency(payload) {
        return _super.call(this, payload, common_1.HttpStatus.FAILED_DEPENDENCY) || this;
    }
    return FailedDependency;
}(BaseException));
exports.FailedDependency = FailedDependency;
