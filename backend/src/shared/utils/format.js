"use strict";
exports.__esModule = true;
exports.getUnixTimestamp = exports.formatMongoosePagination = exports.formatResponseSuccess = void 0;
var moment_1 = require("moment");
function formatResponseSuccess(response) {
    return response;
}
exports.formatResponseSuccess = formatResponseSuccess;
function formatMongoosePagination(paginateResult) {
    var docs = paginateResult.docs, totalDocs = paginateResult.totalDocs, limit = paginateResult.limit, page = paginateResult.page, totalPages = paginateResult.totalPages;
    return {
        data: docs,
        _metadata: {
            totalDocs: totalDocs,
            totalPages: totalPages,
            page: page,
            limit: limit
        }
    };
}
exports.formatMongoosePagination = formatMongoosePagination;
function getUnixTimestamp(date) {
    if (date === void 0) { date = new Date(); }
    return (0, moment_1["default"])(date).unix();
}
exports.getUnixTimestamp = getUnixTimestamp;
