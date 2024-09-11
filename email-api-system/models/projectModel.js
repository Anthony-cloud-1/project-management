/**
 * Project Model
 */

const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: {
        type: String,
        enum: ['not started', 'in progress', 'completed'],  // Define possible statuses
        default: 'not started'  // Default to 'not started' if not specified
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    imageUrl: { type: String }  // Optional: URL to an image associated with the project
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
