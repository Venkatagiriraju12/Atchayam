// backend/routes/admin/userManagementRoutes.js

const express = require('express');
const router = express.Router();
const { getUsers, createUser, updateUser, deleteUser } = require('../../controllers/admin/userManagement');
const { adminMiddleware } = require('../../middlewares/adminMiddleware');

// Get all users (protected)
router.get('/', adminMiddleware, getUsers);

// Create a new user (protected)
router.post('/', adminMiddleware, createUser);

// Update an existing user (protected)
router.put('/:id', adminMiddleware, updateUser);

// Delete a user (protected)
router.delete('/:id', adminMiddleware, deleteUser);

module.exports = router;
