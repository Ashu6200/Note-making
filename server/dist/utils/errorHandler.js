"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const globalErrorHandler = (err, _req, res, _next) => {
    res.status(err.statusCode).json(err);
};
exports.globalErrorHandler = globalErrorHandler;
