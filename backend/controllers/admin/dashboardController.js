// backend/controllers/admin/dashboardController.js

const Payment = require('../../models/Payment');
const User = require('../../models/User');

// Get dashboard statistics
const getDashboardStats = async (req, res) => {
    try {
        const userCount = await User.countDocuments();
        const paymentCount = await Payment.countDocuments();
        const totalRevenue = await Payment.aggregate([
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        res.json({
            userCount,
            paymentCount,
            totalRevenue: totalRevenue[0] ? totalRevenue[0].total : 0,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getDashboardStats };
