// backend/controllers/user/paymentController.js

const Payment = require('../../models/Payment');
const Razorpay = require('razorpay');

// Initialize Razorpay instance
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create a new payment
const createPayment = async (req, res) => {
    try {
        const { amount, currency } = req.body;

        // Create a new order in Razorpay
        const options = {
            amount: amount * 100, // amount in the smallest currency unit (e.g., paise for INR)
            currency: currency || 'INR',
            receipt: `receipt_order_${Math.random().toString(36).substr(2, 9)}`,
        };

        const order = await razorpay.orders.create(options);

        // Save payment record to database
        const payment = new Payment({
            userId: req.user._id,
            amount: order.amount / 100, // convert back to the original currency unit
            currency: order.currency,
            razorpayOrderId: order.id,
        });

        await payment.save();

        res.json({ orderId: order.id, currency: order.currency, amount: order.amount });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Verify payment
const verifyPayment = async (req, res) => {
    try {
        const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;

        // Fetch payment record
        const payment = await Payment.findOne({ razorpayOrderId });

        if (!payment) {
            return res.status(400).json({ message: 'Payment record not found' });
        }

        // Verify signature (Razorpay requires this for security)
        const crypto = require('crypto');
        const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);

        hmac.update(razorpayOrderId + "|" + razorpayPaymentId);
        const generatedSignature = hmac.digest('hex');

        if (generatedSignature !== razorpaySignature) {
            return res.status(400).json({ message: 'Invalid signature' });
        }

        // Update payment status
        payment.razorpayPaymentId = razorpayPaymentId;
        payment.razorpaySignature = razorpaySignature;
        payment.status = 'successful';

        await payment.save();

        res.json({ message: 'Payment verified successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createPayment, verifyPayment };
