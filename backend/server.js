// backend/server.js

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use(express.json());

// Import and use routes
const adminAuthRoutes = require('./routes/admin/authRoutes');
const adminUserManagementRoutes = require('./routes/admin/userManagementRoutes');
const adminPaymentManagementRoutes = require('./routes/admin/paymentManagementRoutes');
const adminDashboardRoutes = require('./routes/admin/dashboardRoutes');

const userAuthRoutes = require('./routes/user/authRoutes');
const userProfileRoutes = require('./routes/user/profileRoutes');
const userPaymentRoutes = require('./routes/user/paymentRoutes');
const userActivityRoutes = require('./routes/user/activityRoutes');

const commonRoutes = require('./routes/commonRoutes');

// Admin routes
app.use('/api/admin/auth', adminAuthRoutes);
app.use('/api/admin/users', adminUserManagementRoutes);
app.use('/api/admin/payments', adminPaymentManagementRoutes);
app.use('/api/admin/dashboard', adminDashboardRoutes);

// User routes
app.use('/api/user/auth', userAuthRoutes);
app.use('/api/user/profile', userProfileRoutes);
app.use('/api/user/payments', userPaymentRoutes);
app.use('/api/user/activities', userActivityRoutes);

// Common routes
app.use('/api/common', commonRoutes);
app.get('/', (req, res) => {
    res.send('Server is running and connected to MongoDB');
});
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
