import { StatusCodeEnums } from "../../enums";
export class ExtendedError extends Error {
    constructor (description: string) {
        super(description);
    
        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this);
    }
}

export class BadRequestError extends ExtendedError {
    statusCode: number | null;
    constructor (description: string) {
        super(description);
        this.statusCode = StatusCodeEnums.NOT_FOUND;
    }
}

export class InvalidRequestError extends ExtendedError {
    statusCode: number | null;
    constructor (description: string) {
        super(description);
        this.statusCode = StatusCodeEnums.BAD_REQUEST;
    }
}

export class InternalServerError extends ExtendedError {
    statusCode: number | null;
    constructor (description: string) {
        super(description);
        this.statusCode = StatusCodeEnums.INTERNAL_SERVER;
    }
}
   