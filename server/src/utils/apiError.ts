import { NextFunction, Request } from 'express'
import { THttpError } from '../types/types';
import config from '../config/config';

export const apiError = (
    nextFun: NextFunction,
    err: Error | unknown,
    req: Request,
    errorStatusCode: number = 500
): void => {
    const errorObj: THttpError = {
        success: false,
        statusCode: errorStatusCode,
        request: {
            ip: req.ip || null,
            method: req.method,
            url: req.originalUrl,
        },
        message: err instanceof Error ? err.message : null,
        data: null,
        trace: err instanceof Error && err.stack ? { error: err.stack } : null,
    };
    if (config.ENV === "production") {
        delete errorObj.request.ip
        delete errorObj.trace
    }


    nextFun(errorObj);
};
