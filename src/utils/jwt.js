const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const dotenv = require('dotenv');

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'votre_secret_jwt';
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '1h';

// Fonction pour générer un jeton JWT
const generateToken = (user) => {
    const payload = {
        id: user.id,
        role: user.role,
    };
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
};

// Fonction pour vérifier un jeton JWT
const verifyToken = async (token) => {
    const verify = promisify(jwt.verify);
    return await verify(token, JWT_SECRET);
};

module.exports = {
    generateToken,
    verifyToken,
};