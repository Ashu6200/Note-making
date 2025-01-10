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
const express_1 = __importDefault(require("express"));
const asyncHandler_1 = __importDefault(require("./utils/asyncHandler"));
const apiResponse_1 = require("./utils/apiResponse");
const errorHandler_1 = require("./utils/errorHandler");
const apiError_1 = require("./utils/apiError");
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const noteRoute_1 = __importDefault(require("./routes/noteRoute"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const corsOptions = {
    origin: process.env.CORS_ORIGINS.split(','),
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/", (0, asyncHandler_1.default)((req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, apiResponse_1.apiResponse)(req, res, 200, "NoteMaking server is live", {});
})));
app.use("/user", userRoute_1.default);
app.use("/note", noteRoute_1.default);
app.use((req, _res, next) => {
    try {
        throw new Error("Route not found");
    }
    catch (error) {
        (0, apiError_1.apiError)(next, error, req, 500);
    }
});
app.use(errorHandler_1.globalErrorHandler);
exports.default = app;
