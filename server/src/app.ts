import express, { Application, NextFunction, Request, Response } from "express";
import asyncHandler from "./utils/asyncHandler";
import { apiResponse } from "./utils/apiResponse";
import { globalErrorHandler } from "./utils/errorHandler";
import { apiError } from "./utils/apiError";
import userRouter from "./routes/userRoute";
import noteRouter from "./routes/noteRoute";
import cors from "cors";
import dotenv from 'dotenv';

const app: Application = express();

dotenv.config();
const corsOptions = {
    origin: (process.env.CORS_ORIGINS as string).split(','),
    credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get(
    "/",
    asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
        return apiResponse(req, res, 200, "NoteMaking server is live", {});
    })
);
app.use("/user", userRouter);
app.use("/note", noteRouter);
app.use((req: Request, _res: Response, next: NextFunction) => {
    try {
        throw new Error("Route not found");
    } catch (error) {
        apiError(next, error, req, 500);
    }
});
app.use(globalErrorHandler);

export default app;
