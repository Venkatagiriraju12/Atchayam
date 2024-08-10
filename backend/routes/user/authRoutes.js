// backend/routes/authRoutes.js

const express = require('express');
const router = express.Router();
const { registerUser, loginUser, verifyOtp } = require('../controllers/user/authController');

// Register user
router.post('/register', registerUser);

// Login user
router.post('/login', loginUser);

// Verify OTP
router.post('/verify-otp', verifyOtp);

// Resend OTP
router.post('/resend-otp', async (req, res) => {
    try {
        const { phoneNumber } = req.body;

        await client.verify.services(serviceId).verifications.create({
            to: `+${phoneNumber}`,
            channel: 'sms'
        });

        res.json({ message: 'OTP resent successfully.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
