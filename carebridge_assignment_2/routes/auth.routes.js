const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {sendEmail} = require('../service/email.service');
const {uploadToCloudinary} = require('../service/email.service');
const logger = require('../utils/app.logger');

const router = require('express').Router();

// @desc    Register doctor (unverified)
// @route   POST /api/auth/register/doctor
router.post('/register/doctor', async (req, res) => {
    const {email, password, name, specialty, licenseNo} = req.body;

    const doctor = await User.create({
        email,
        password,
        name,
        role: 'doctor',
        specialty,
        licenseNo,
        isVerified: false
    });
    await User.updateMany({role: 'admin'}, {$push: {notifications: `New doctor to verify: ${doctor._id}`}});

    logger.info(`New doctor registered: ${doctor._id}`);
    res.status(201).json({success: true, data: {userId: doctor._id,name: doctor.name, status: doctor.isVerified}});
});

// @desc    Verify doctor (Admin only)
// @route   POST /api/auth/verify/doctor/:id
router.post('verify/doctor/:id', async (req, res) => {
    const doctor = await User.findByIdAndUpdate(req.params.id, {isVerified: true}, {new: true});

    if (!doctor) {
        return res.status(404).json({success: false, error: 'Doctor not found'});
    }

    await sendEmail({
        email: doctor.email,
        subject: 'CareBridge - Account Approved',
        template: 'doctorApproved',
        data: {name: doctor.name}
    });

    logger.info(`Doctor verified: ${doctor._id}`);
    res.status(200).json({success: true, data: {}});
});

// @desc    Login user
// @route   POST /api/auth/login
router.post('/login', async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email}).select('+password');
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({success: false, error: 'Invalid credentials'});
    }

    // Check doctor verification
    if (user.role === 'doctor' && !user.isVerified) {
        return res.status(403).json({
            success: false, error: 'Account pending admin verification'
        });
    }

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });

    // Set HTTP-only cookie
    res.cookie('token', token, {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production'
    });

    logger.info(`User logged in: ${user._id}`);
    res.status(200).json({success: true, data: {role: user.role}});
});


module.exports = router;
