/**
 * MongoDB user schema
 */

// models/userModel.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ['admin', 'client', 'team_member'],  // Define the roles
        default: 'client'  // Default to 'client' if not specified
    },
    resetPasswordToken: { type: String },  // Token for password reset
    resetPasswordExpires: { type: Date }  // Expiration time for the reset token
});

// Encrypt password before saving (bcrypt)
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

module.exports = mongoose.model('User', userSchema);