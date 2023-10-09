"use strict";
exports.__esModule = true;
exports.useMorgan = void 0;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
var morgan_1 = require("morgan");
morgan_1["default"].token('user', function (req) {
    var _a;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (req === null || req === void 0 ? void 0 : req.user)
        return "[User: ".concat((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.userId, "]");
    return 'Anonymous';
});
morgan_1["default"].format('custom', function (tokens, req, res) {
    // tokens['remote-addr-cus'] = () => tokens['remote-addr'](req).padStart(29, ' ').substr(0, 29);
    // const frm = `ACCESS :date[iso] :remote-addr-cus | :user :method :url :status - :response-time ms`;
    var frm = ":remote-addr :user :method :url :status - :response-time ms";
    var fn = morgan_1["default"].compile(frm);
    return fn(tokens, req, res);
});
function useMorgan(logger) {
    if (!logger)
        return (0, morgan_1["default"])('custom');
    return (0, morgan_1["default"])('custom', {
        stream: logger
    });
}
exports.useMorgan = useMorgan;
