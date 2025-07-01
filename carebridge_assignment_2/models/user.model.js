const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'doctor', 'patient'], required: true },
    name: { type: String, required: true },
    isVerified: { type: Boolean, default: false }, // For doctors
    verificationToken: { type: String }, // For email verification
    // Doctor-specific
    specialty: { type: String },
    licenseNo: { type: String, unique: true },
    documents: [{ type: String }], // License/ID uploads
    // Patient-specific
    birthDate: { type: Date },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Doctor who created patient
});

UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

module.exports = mongoose.model('User', UserSchema);
