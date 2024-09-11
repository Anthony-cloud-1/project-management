/**
 * Project routes
 */

const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const authRole = require('../middleware/authRole');
const Project = require('../models/projectModel');

// Create a project
router.post('/', auth, async (req, res) => {
    console.log("POST request to /api/projects received");
    const { title, description, imageUrl } = req.body;

    try {
        const newProject = new Project({
            title,
            description,
            createdBy: req.user.id,  // Set the user creating the project
            imageUrl
        });

        await newProject.save();
        res.status(201).json(newProject);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get all projects
router.get('/', auth, async (req, res) => {
    try {
        const projects = await Project.find().populate('createdBy', 'name email');  // Populate user details
        res.json(projects);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get a single project by ID
router.get('/:id', auth, async (req, res) => {
    const { id } = req.params;

    try {
        const project = await Project.findById(id).populate('createdBy', 'name email');
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json(project);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Update a project by ID
router.put('/:id', auth, async (req, res) => {
    const { id } = req.params;
    const { title, description, status, imageUrl } = req.body;

    try {
        const project = await Project.findById(id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        if (project.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        project.title = title || project.title;
        project.description = description || project.description;
        project.status = status || project.status;
        project.imageUrl = imageUrl || project.imageUrl;

        await project.save();
        res.json(project);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Delete a project by ID
router.delete('/:id', auth, async (req, res) => {
    const { id } = req.params;

    try {
        const project = await Project.findById(id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Check if the user is authorized to delete the project
        if (project.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        await Project.findByIdAndDelete(id);  // Correct method for deletion
        res.json({ message: 'Project removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


module.exports = router;
