// backend/controllers/admin/paymentManagement.js

const Payment = require('../../models/Payment');

// Get all payments
const getPayments = async (req, res) => {
    try {
        const payments = await Payment.find();
        res.json(payments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Refund a payment
const refundPayment = async (req, res) => {
    try {
        const paymentId = req.params.id;
        // Logic for processing the refund
        // This is a placeholder. You need to implement the actual refund logic.
        const payment = await Payment.findById(paymentId);
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        // Assume we process the refund here and update the payment status
        payment.status = 'refunded';
        await payment.save();

        res.json({ message: 'Payment refunded successfully', payment });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getPayments, refundPayment };
