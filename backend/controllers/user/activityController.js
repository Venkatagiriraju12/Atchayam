// backend/controllers/user/activityController.js

const User = require('../../models/User');
const Activity = require('../../models/Activity');

// Get user activities
const getUserActivities = async (req, res) => {
    try {
        const activities = await Activity.find({ userId: req.user._id }).sort({ createdAt: -1 });
        res.json(activities);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getUserActivities };
