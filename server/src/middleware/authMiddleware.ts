import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/userModel";
import { CustomRequest, DecodedToken } from "../types/types";
import { apiError } from "../utils/apiError";
import config from "../config/config";


const authMiddleware = async (req: CustomRequest, _res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '')
        if (!token) {
            throw new Error('Authentication failed. Token missing.')
        }

        const decoded = jwt.verify(token, config.JWT as string) as DecodedToken
        const user = await UserModel.findOne({
            _id: decoded.userId,
        })

        if (!user) {
            throw new Error('Authentication failed. User not found.')
        }
        req.userId = user._id as string;
        next()
    } catch (error) {
        return apiError(next, error, req, 401)
    }
};

export default authMiddleware;
