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
exports.verifyOtp = exports.signUp = void 0;
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const apiError_1 = require("../utils/apiError");
const sendMail_1 = __importDefault(require("../helper/sendMail"));
const apiResponse_1 = require("../utils/apiResponse");
const userModel_1 = require("../models/userModel");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.signUp = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, page } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
    try {
        const user = yield userModel_1.UserModel.findOne({ email });
        if (user) {
            user.otp = Number(otp);
            user.otpExpiry = otpExpiry;
            yield user.save();
            yield (0, sendMail_1.default)(email, user.name, otp);
            const message = page === "signup" ? "You already have an account please signin with OTP that has been sent to your email " : "Please sign in using the OTP that has been sent to your email.";
            return (0, apiResponse_1.apiResponse)(req, res, 200, message, {});
        }
        yield userModel_1.UserModel.create({
            name, email, otp, otpExpiry
        });
        yield (0, sendMail_1.default)(email, name, otp);
        return (0, apiResponse_1.apiResponse)(req, res, 200, "Signin OTP has been delivered", {});
    }
    catch (error) {
        return (0, apiError_1.apiError)(next, error, req, 401);
    }
}));
exports.verifyOtp = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, otp } = req.body;
    try {
        const user = yield userModel_1.UserModel.findOne({ email, otp });
        if (!user) {
            return (0, apiError_1.apiError)(next, new Error("User not found or invalid OTP"), req, 401);
        }
        if (user.otp !== otp) {
            return (0, apiError_1.apiError)(next, new Error("Invalid OTP"), req, 402);
        }
        if (new Date() > user.otpExpiry) {
            return (0, apiError_1.apiError)(next, new Error("OTP expired"), req, 403);
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET);
        const data = { token, email: user.email, name: user.name };
        return (0, apiResponse_1.apiResponse)(req, res, 200, "Signin OTP verified", data);
    }
    catch (error) {
        return (0, apiError_1.apiError)(next, error, req, 401);
    }
}));
