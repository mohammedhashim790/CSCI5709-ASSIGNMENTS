const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const logger = require('../utils/app.logger');
const {UnAuthorizedError} = require("../utils/errors");
const {JsonWebTokenError} = require("jsonwebtoken");


// Protect routes with JWT
exports.protect = async (req, res, next) => {
    let token;

    if (req.cookies.token) {
        token = req.cookies.token;
    } else if (req.headers.authorization?.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(new UnAuthorizedError('Not authorized'));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        next();
    } catch (err) {
        logger.error(`JWT Error: ${err.message}`);
        next(new JsonWebTokenError('Not authorized'));
    }
};

// Role-based access control
exports.authorize = (...roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return next(
            new UnAuthorizedError(`Role ${req.user.role} is unauthorized`)
        );
    }
    next();
};
