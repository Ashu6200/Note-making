"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiError = void 0;
const config_1 = __importDefault(require("../config/config"));
const apiError = (nextFun, err, req, errorStatusCode = 500) => {
    const errorObj = {
        success: false,
        statusCode: errorStatusCode,
        request: {
            ip: req.ip || null,
            method: req.method,
            url: req.originalUrl,
        },
        message: err instanceof Error ? err.message : null,
        data: null,
        trace: err instanceof Error && err.stack ? { error: err.stack } : null,
    };
    if (config_1.default.ENV === "production") {
        delete errorObj.request.ip;
        delete errorObj.trace;
    }
    nextFun(errorObj);
};
exports.apiError = apiError;
