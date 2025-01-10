import { Request, Response } from "express"
import { THttpResponse } from "../types/types"
import config from "../config/config"

export const apiResponse = (req: Request, res: Response, responseStatusCode: number, responseMessage: string, data: unknown) => {

    const responseObj: THttpResponse = {
        success: true,
        statusCode: responseStatusCode,
        request: {
            ip: req.ip || null,
            method: req.method,
            url: req.originalUrl

        },
        message: responseMessage,
        data: data
    }
    if (config.ENV === "production") {
        delete responseObj.request.ip
    }
    return res.status(responseStatusCode).json(responseObj)
} 