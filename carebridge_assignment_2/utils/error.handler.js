const logger = require('../utils/app.logger');

/**
 * Global error handler middleware
 * @param {Error} err - Error object
 * @param {Request} req - Express request
 * @param {Response} res - Express response
 * @param {NextFunction} next - Express next
 */
const errorHandler = (err, req, res, next) => {
    let error = {...err};
    error.message = err.message;
    error.statusCode = err.statusCode || 500;
    logger.error(`${error.statusCode} - ${error.message} - ${req.method} ${req.originalUrl} - ${req.ip} - Stack: ${err.stack}`);
    res.status(error.statusCode).json({
        success: false,
        error: error.message || 'Server Error',
        details: error.details || undefined,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
};

module.exports = errorHandler;
