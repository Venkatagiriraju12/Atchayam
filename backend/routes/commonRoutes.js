// backend/routes/commonRoutes.js

const express = require('express');
const router = express.Router();
const { logActivity } = require('../controllers/commonController');

// Log activity route
router.post('/log', logActivity);

module.exports = router;
