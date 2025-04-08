const User = require('../models/userModel');
const jwt = require('../utils/jwt');

// Créer un nouvel utilisateur (technicien ou utilisateur) par un administrateur
exports.createUser = async (req, res) => {
    const { username, password, role } = req.body;

    try {
        const newUser = await User.create({ username, password, role });
        res.status(201).json({ message: 'Utilisateur créé avec succès', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur', error: error.message });
    }
};

// Créer un nouveau technicien par un administrateur
exports.createTechnician = async (req, res) => {
    const { username, password } = req.body;

    try {
        const newTechnician = await User.create({ username, password, role: 'technician' });
        res.status(201).json({ message: 'Technicien créé avec succès', technician: newTechnician });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création du technicien', error: error.message });
    }
};

// Récupérer tous les utilisateurs
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs', error: error.message });
    }
};

// Supprimer un utilisateur par un administrateur
exports.deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        await User.delete(id);
        res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur', error: error.message });
    }
};