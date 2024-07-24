class ApiError extends Error{ //for handleing api errors
    constructor(
        statusCode,
        message="Something went wrong",
        errors = [],
        statck = ""
    ){
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false;
        this.errors = errors

    }
}

export {ApiError}