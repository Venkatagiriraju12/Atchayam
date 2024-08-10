// backend/controllers/user/authController.js

const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const twilio = require('twilio');

// Twilio configuration
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceId = process.env.TWILIO_SERVICE_ID;

const client = twilio(accountSid, authToken);

// Register a new user
const registerUser = async (req, res) => {
    try {
        const { name, email, phoneNumber, password } = req.body;

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user
        user = new User({
            name,
            email,
            phoneNumber,
            password: bcrypt.hashSync(password, 10),
        });

        await user.save();

        // Send OTP using Twilio
        await client.verify.services(serviceId).verifications.create({
            to: `+${phoneNumber}`, // Ensure this is in E.164 format
            channel: 'sms'
        });

        res.status(201).json({ message: 'User registered successfully. OTP sent.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Send OTP using Twilio
        await client.verify.services(serviceId).verifications.create({
            to: `+${user.phoneNumber}`,
            channel: 'sms'
        });

        res.json({ message: 'OTP sent to your phone number' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Verify OTP
const verifyOtp = async (req, res) => {
    try {
        const { phoneNumber, otp } = req.body;

        const user = await User.findOne({ phoneNumber });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Verify OTP with Twilio
        const verificationCheck = await client.verify.services(serviceId)
            .verificationChecks.create({
                to: `+${phoneNumber}`,
                code: otp
            });

        if (verificationCheck.status !== 'approved') {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { registerUser, loginUser, verifyOtp };
