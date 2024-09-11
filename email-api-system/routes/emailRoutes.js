/**
 * Routes for email sending
 */

const express = require('express');
const { sendEmail } = require('../controllers/emailController');
const { auth } = require('../middleware/auth');
const multer = require('multer');
const router = express.Router();

// Multer setup for handling file uploads
const upload = multer({ dest: 'uploads/' });  // Adjust the destination as needed

// Route to send an email with optional attachment
router.post('/send', auth, upload.single('attachment'), sendEmail);

module.exports = router;
