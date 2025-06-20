const User = require('../models/user.model');
const {makePassword, comparePassword} = require("../utils/password_helper");
const {generateToken} = require("../utils/jwt");

const register = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(400).json({message: 'User already exists!'});
        }
        const passwordHash = await makePassword(password, 10);
        const user = new User({
            name, email, password: passwordHash
        });

        await user.save();
        const token = generateToken(user._id);
        const message = 'User created successfully';
        res.status(201).json({message,token});
    } catch (error) {
        res.status(500).json({message: 'Internal Server error'});
    }
};

const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if (!user) {
            return res.status(401).json({message: 'Invalid credentials'});
        }
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(401).json({message: 'Invalid credentials'});
        }
        const token = generateToken(user._id);

        res.status(200).json({token});
    } catch (error) {
        res.status(500).json({message: 'Internal Server error'});
    }
};

module.exports = {
    register,
    login
};
