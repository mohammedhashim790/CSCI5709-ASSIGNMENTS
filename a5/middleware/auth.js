const {verifyToken} = require("../utils/jwt");
const User = require('../models/user.model');

const auth_middleware = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        if (!token) {
            throw new Error('No token provided');
        }
        const decoded = verifyToken(token);
        req.user = await User.findById(decoded.userId).select('-password');
        next();
    } catch (error) {
        res.status(401).json({message: 'User not authorized'});
    }
};

module.exports = {auth_middleware};
