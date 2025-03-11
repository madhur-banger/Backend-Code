class ApiError{ 
    constructor(
        statusCode,
        message = "This is demo message",
        errors = [],
        stack = ""
    )
    {
        this.statusCode = statusCode;
        this.data = null;
        this.message = message;
        this.errors = errors;
        this.success = false;

        if(stack){
            this.stack = stack;
        }
        else{
            Error.captureStackTrace(this, this.constructor);
        }
    }

}

export {ApiError};