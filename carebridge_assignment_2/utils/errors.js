/**
 * Create custom error response
 * @param {string} message - Error message
 * @param {number} statusCode - HTTP status code
 * @param {object} details - Additional error details
 */

class ErrorResponse extends Error {
    constructor(message, statusCode = 500, details = {}) {
        super(message);
        this.statusCode = statusCode;
        this.details = details;
        this.isOperational = true; // Distinguish operational errors
        Error.captureStackTrace(this, this.constructor);
    }
}

class ValidationError extends ErrorResponse {
    constructor(message, details = {}) {
        super(message, 400, details);
    }
}

class TokenExpiredError extends ErrorResponse {
    constructor(message, details = {}) {
        super(message, 401, details);
    }
}

class UnAuthorizedError extends ErrorResponse {
    constructor(message, details = {}) {
        super(message, 401, details);
    }
}

module.exports = {
    ErrorResponse, ValidationError, TokenExpiredError, UnAuthorizedError
};
