/**
 * Email model
 */

const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
    sentBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    subject: { type: String, required: true },
    body: { type: String, required: true },
    attachments: [{ type: String }],  // URLs or file paths of attachments
    sentAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Email', emailSchema);
