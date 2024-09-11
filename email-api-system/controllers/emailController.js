/**
 * Email sending logic
 */

const nodemailer = require('nodemailer');
const Email = require('../models/emailModel');  // Ensure this path is correct

exports.sendEmail = async (req, res) => {
    const { to, subject, text } = req.body;
    const attachment = req.file;  // If there is an attachment
    const { id: userId } = req.user;  // User sending the email

    let mailOptions = {
        from: process.env.EMAIL,  // The sender's email
        to,
        subject,
        text
    };

    // If an attachment exists, add it
    if (attachment) {
        mailOptions.attachments = [
            {
                filename: attachment.originalname,
                path: attachment.path
            }
        ];
    }

    try {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });

        await transporter.sendMail(mailOptions);

        // Save email details to the database
        const newEmail = new Email({
            sentBy: userId,
            subject,
            body: text,
            attachments: attachment ? [{ filename: attachment.originalname, path: attachment.path }] : [],
            sentAt: new Date()
        });

        await newEmail.save();

        res.json({ message: 'Email sent successfully' });
        console.log('Email sent successfully');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Email sending failed');
    }
};
