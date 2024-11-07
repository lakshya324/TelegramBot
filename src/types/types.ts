import { Request } from "express";

export interface AuthRequest extends Request {
    // No Auth Required in this project {if required, I will add here}
}

export interface StatusError extends Error {
    statusCode?: number;
}