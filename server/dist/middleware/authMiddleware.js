"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = require("../models/userModel");
const apiError_1 = require("../utils/apiError");
const config_1 = __importDefault(require("../config/config"));
const authMiddleware = (req, _res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
        if (!token) {
            throw new Error('Authentication failed. Token missing.');
        }
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.JWT);
        const user = yield userModel_1.UserModel.findOne({
            _id: decoded.userId,
        });
        if (!user) {
            throw new Error('Authentication failed. User not found.');
        }
        req.userId = user._id;
        next();
    }
    catch (error) {
        return (0, apiError_1.apiError)(next, error, req, 401);
    }
});
exports.default = authMiddleware;
