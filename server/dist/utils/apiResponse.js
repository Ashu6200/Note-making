"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiResponse = void 0;
const config_1 = __importDefault(require("../config/config"));
const apiResponse = (req, res, responseStatusCode, responseMessage, data) => {
    const responseObj = {
        success: true,
        statusCode: responseStatusCode,
        request: {
            ip: req.ip || null,
            method: req.method,
            url: req.originalUrl
        },
        message: responseMessage,
        data: data
    };
    if (config_1.default.ENV === "production") {
        delete responseObj.request.ip;
    }
    return res.status(responseStatusCode).json(responseObj);
};
exports.apiResponse = apiResponse;
