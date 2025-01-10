import { Request } from "express"
import { IUser } from "../models/userModel"

export type THttpResponse = {
    success: boolean
    statusCode: number
    request: {
        ip?: string | null
        method: string
        url: string
    }
    message: string | null;
    data: unknown
}

export type THttpError = {
    success: boolean
    statusCode: number
    request: {
        ip?: string | null
        method: string
        url: string
    }
    message: string | null;
    data: unknown
    trace?: object | null
}

export type TCONFIG = {
    ENV: string
    PORT: string
    SERVER_URL: string
    DATABASEURL: string
}

export type DecodedToken = {
    userId: string
}

export interface CustomRequest extends Request {
    user?: IUser
    userId?: string
}