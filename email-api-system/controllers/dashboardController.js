/**
 * Dashboard
 */

const Project = require('../models/projectModel');
const Email = require('../models/emailModel');


// Get dashboard data including project and email statistics

exports.getDashboardData = async (req, res) => {
    try {
        const userId = req.user.id;

        // Fetch user-specific data
        const projectCount = await Project.countDocuments({ createdBy: userId });
        const emailCount = await Email.countDocuments({ sentBy: userId });

        // Fetch detailed information about the user's projects
        const projects = await Project.find({ createdBy: userId })
            .select('title description status')  // Adjust the fields as needed
            .populate('createdBy', 'name email');  // Populate user details if needed

        // Example response
        res.json({
            user: req.user,
            projectCount,
            emailCount,
            projects,  // Include the detailed project information
            // Add more statistics or recent activities if needed
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
