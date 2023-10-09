"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoggerService = void 0;
var common_1 = require("@nestjs/common");
var log4js_1 = require("log4js");
var env_constant_1 = require("@constants/env.constant");
var layouts = {
    console: {
        type: 'pattern',
        pattern: '%[%-6p %d [%c] | %m%]'
    },
    dateFile: {
        type: 'pattern',
        pattern: '%-6p %d [%c] | %m'
    },
    access: {
        type: 'pattern',
        pattern: '%[%-6p %d [%c] [address:%x{remoteAddr}] %x{access}%]',
        tokens: {
            remoteAddr: function (logEvent) {
                var remoteAddr = logEvent.data.toString().split(' ', 1).pop();
                remoteAddr = remoteAddr.replace(/^.*:/, '');
                remoteAddr = remoteAddr === '1' ? '127.0.0.1' : remoteAddr;
                return remoteAddr;
            },
            access: function (logEvent) {
                var _a = logEvent.data.toString().split(' '), data = _a.slice(1);
                data.pop();
                return data.join(' ');
            }
        }
    }
};
var appenders = {
    console: {
        type: 'console',
        layout: layouts.console
    },
    dateFile: {
        type: 'dateFile',
        filename: 'logs/out.log',
        pattern: '-yyyy-MM-dd',
        layout: layouts.dateFile
    },
    access: {
        type: 'console',
        layout: layouts.access
    },
    dateFileAccess: {
        type: 'dateFile',
        filename: 'logs/out.log',
        pattern: '-yyyy-MM-dd',
        layout: layouts.access
    },
    multi: {
        type: 'multiFile',
        base: 'logs/',
        property: 'categoryName',
        extension: '.log'
    }
};
var LoggerService = /** @class */ (function () {
    /**
     * config logging
     * @example
     * Import Logging module
     * constructor(protected loggingService: LoggingService) {}
     * logger = this.loggingService.getLogger('serviceA');
     */
    function LoggerService(configService) {
        var _this = this;
        this.configService = configService;
        this.getLogger = log4js_1.getLogger;
        this._access = function () {
            var logger = _this.getLogger('access');
            return {
                write: logger.info.bind(logger)
            };
        };
        this.logger = {
            "default": (0, log4js_1.getLogger)('default'),
            access: this._access(),
            thirdParty: (0, log4js_1.getLogger)('thirdParty')
        };
        var level = configService.get(env_constant_1.EEnvKey.LOG_LEVEL);
        var isWriteLog = configService.get(env_constant_1.EEnvKey.IS_WRITE_LOG) === 'true';
        (0, log4js_1.configure)({
            appenders: appenders,
            categories: {
                "default": {
                    appenders: isWriteLog ? ['console', 'dateFile'] : ['console'],
                    level: level,
                    enableCallStack: true
                },
                access: {
                    appenders: isWriteLog ? ['access', 'dateFileAccess'] : ['access'],
                    level: 'info',
                    enableCallStack: true
                }
            }
        });
    }
    LoggerService = __decorate([
        (0, common_1.Injectable)()
    ], LoggerService);
    return LoggerService;
}());
exports.LoggerService = LoggerService;
