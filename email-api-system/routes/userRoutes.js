/**
 * Routes for user management
 */

const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const authRole = require('../middleware/authRole');
const { deleteUser, getAllUsers, getUserById, updateUser } = require('../controllers/userController');

// Admin route to get all users
router.get('/', auth, authRole('admin'), getAllUsers);

// Admin route to get a specific user by ID
router.get('/:id', auth, authRole('admin'), getUserById);

// Delete a user (self or by admin)
router.delete('/delete/:id', auth, deleteUser);

// Update user details (self only)
router.put('/update', auth, updateUser);

module.exports = router;