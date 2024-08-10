// backend/routes/admin/paymentManagementRoutes.js

const express = require('express');
const router = express.Router();
const { getPayments, refundPayment } = require('../../controllers/admin/paymentManagement');
const { adminMiddleware } = require('../../middlewares/adminMiddleware');

// Get all payments (protected)
router.get('/', adminMiddleware, getPayments);

// Refund a payment (protected)
router.post('/refund/:id', adminMiddleware, refundPayment);

module.exports = router;
