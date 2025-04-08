const jwt = require('jsonwebtoken');
const { User } = require('../models/userModel');

const authMiddleware = (roles = []) => {
    return async (req, res, next) => {
        try {
            const token = req.headers['authorization']?.split(' ')[1];
            if (!token) {
                return res.status(401).json({ message: 'Non autorisé' });
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id);

            if (!req.user) {
                return res.status(401).json({ message: 'Non autorisé' });
            }

            if (roles.length && !roles.includes(req.user.role)) {
                return res.status(403).json({ message: 'Accès interdit' });
            }

            next();
        } catch (error) {
            return res.status(401).json({ message: 'Non autorisé' });
        }
    };
};

module.exports = authMiddleware;