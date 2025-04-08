const User = require('../models/userModel');
const jwt = require('../utils/jwt');
const bcrypt = require('bcrypt');

// Connexion de l'administrateur
exports.adminLogin = async (req, res) => {
    const { username, password } = req.body;

    // Vérifier si l'administrateur existe
    const admin = await User.findByUsername(username);
    if (!admin || !admin.isAdmin) {
        return res.status(401).json({ message: 'Non autorisé' });
    }

    // Valider le mot de passe
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Identifiants invalides' });
    }

    // Générer un jeton JWT
    const token = jwt.generateToken(admin.id, admin.role);
    res.json({ token });
};

// Inscription des utilisateurs et des techniciens
exports.registerUser = async (req, res) => {
    const { username, password, role } = req.body;

    // Seul un administrateur peut créer des utilisateurs ou des techniciens
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Accès interdit' });
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer un nouvel utilisateur
    const newUser = await User.create({ username, password: hashedPassword, role });
    res.status(201).json(newUser);
};

// Connexion des utilisateurs et des techniciens
exports.login = async (req, res) => {
    const { username, password } = req.body;

    // Vérifier si l'utilisateur existe
    const user = await User.findByUsername(username);
    if (!user) {
        return res.status(401).json({ message: 'Identifiants invalides' });
    }

    // Valider le mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Identifiants invalides' });
    }

    // Générer un jeton JWT
    const token = jwt.generateToken(user.id, user.role);
    res.json({ token });
};