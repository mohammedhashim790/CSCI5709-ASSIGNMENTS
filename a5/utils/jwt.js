const jwt = require('jsonwebtoken');



const generateToken = (userId) => {
    return jwt.sign({userId: userId}, process.env.JWT_SECRET, {expiresIn: '4h'});
}


const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = {
    generateToken,
    verifyToken
}
