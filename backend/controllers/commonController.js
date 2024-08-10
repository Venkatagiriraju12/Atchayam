// backend/controllers/commonController.js

const Activity = require('../models/Activity');

// Log activity function
const logActivity = async (req, res) => {
    try {
        const { userId, action, description } = req.body;

        // Create a new activity log
        const activity = new Activity({
            userId,
            action,
            description,
        });

        await activity.save();

        res.status(201).json({ message: 'Activity logged successfully', activity });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { logActivity };
