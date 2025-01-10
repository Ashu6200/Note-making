"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    ENV: process.env.ENV,
    PORT: process.env.PORT,
    SERVER_URL: process.env.SERVER_URL,
    DATABASEURL: process.env.MONGODB_URL,
    EMAILUSER: process.env.EMAIL_USER,
    EMAILPASS: process.env.EMAIL_PASSWORD,
    JWT: process.env.JWT_SECRET
};
exports.default = config;
