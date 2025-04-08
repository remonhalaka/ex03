const bcrypt = require('bcrypt');
const jwt = require('../utils/jwt');
const User = require('../models/userModel');

const authService = {
    // Fonction pour enregistrer un nouvel utilisateur
    async registerUser(userData) {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const newUser = await User.create({
            ...userData,
            password: hashedPassword,
        });
        return newUser;
    },

    // Fonction pour connecter un utilisateur
    async loginUser(email, password) {
        const user = await User.findByEmail(email);
        if (!user) {
            throw new Error('Utilisateur non trouvé');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Identifiants invalides');
        }
        const token = jwt.generateToken({ id: user.id, role: user.role });
        return { user, token };
    },

    // Fonction pour créer un technicien
    async createTechnician(technicianData) {
        const hashedPassword = await bcrypt.hash(technicianData.password, 10);
        const newTechnician = await User.create({
            ...technicianData,
            password: hashedPassword,
            role: 'technician',
        });
        return newTechnician;
    },
};

module.exports = authService;