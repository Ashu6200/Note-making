import { NextFunction, Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import { apiError } from "../utils/apiError";
import sendMail from "../helper/sendMail";
import { apiResponse } from "../utils/apiResponse";
import { UserModel } from "../models/userModel";
import jwt from "jsonwebtoken";

export const signUp = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, page } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    try {
        const user = await UserModel.findOne({ email });

        if (user) {
            user.otp = Number(otp);
            user.otpExpiry = otpExpiry;
            await user.save();
            await sendMail(email, user.name, otp);
            const message = page === "signup" ? "You already have an account please signin with OTP that has been sent to your email " : "Please sign in using the OTP that has been sent to your email."
            return apiResponse(req, res, 200, message, {});
        }
        await UserModel.create({
            name, email, otp, otpExpiry
        });
        await sendMail(email, name, otp);
        return apiResponse(req, res, 200, "Signin OTP has been delivered", {});

    } catch (error) {
        return apiError(next, error, req, 401);
    }
});

export const verifyOtp = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { email, otp } = req.body;

    try {
        const user = await UserModel.findOne({ email, otp });

        if (!user) {
            return apiError(next, new Error("User not found or invalid OTP"), req, 401);
        }
        if (user.otp !== otp) {
            return apiError(next, new Error("Invalid OTP"), req, 402);
        }
        if (new Date() > user.otpExpiry!) {
            return apiError(next, new Error("OTP expired"), req, 403);
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!);
        const data = { token, email: user.email, name: user.name };
        return apiResponse(req, res, 200, "Signin OTP verified", data);
    } catch (error) {
        return apiError(next, error, req, 401);
    }
});

