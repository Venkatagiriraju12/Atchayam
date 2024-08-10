// backend/middlewares/adminMiddleware.js

const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

exports.adminMiddleware = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
        return res.status(401).send({ error: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const admin = await Admin.findOne({ _id: decoded.id });

        if (!admin) {
            return res.status(401).send({ error: 'Unauthorized' });
        }

        req.admin = admin;
        next();
    } catch (err) {
        res.status(401).send({ error: 'Unauthorized' });
    }
};
