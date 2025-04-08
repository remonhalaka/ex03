const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const validationMiddleware = require('../middlewares/validationMiddleware');

const router = express.Router();

// Route de connexion pour l'administrateur
router.post('/admin', 
    body('username').notEmpty().withMessage("Le nom d'utilisateur est requis"),
    body('password').notEmpty().withMessage('Le mot de passe est requis'),
    validationMiddleware.validate,
    authController.adminLogin
);

// Route d'inscription pour les utilisateurs et les techniciens
router.post('/new', 
    body('username').notEmpty().withMessage("Le nom d'utilisateur est requis"),
    body('password').isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères'),
    body('role').isIn(['user', 'technician']).withMessage('Le rôle doit être soit utilisateur soit technicien'),
    validationMiddleware.validate,
    authController.registerUserOrTechnician
);

// Route de connexion pour les utilisateurs et les techniciens
router.post('/login', 
    body('username').notEmpty().withMessage("Le nom d'utilisateur est requis"),
    body('password').notEmpty().withMessage('Le mot de passe est requis'),
    validationMiddleware.validate,
    authController.login
);

module.exports = router;