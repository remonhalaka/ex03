const express = require('express');
const { body } = require('express-validator');
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Route pour créer un nouvel utilisateur
router.post('/users', 
  authMiddleware.verifyAdmin, 
  body('username').isString().notEmpty().withMessage("Le nom d'utilisateur est requis"),
  body('password').isString().notEmpty().withMessage('Le mot de passe est requis'),
  body('role').isIn(['user', 'technician']).withMessage('Le rôle doit être soit utilisateur soit technicien'),
  adminController.createUser
);

// Route pour créer un nouveau technicien
router.post('/technicians', 
  authMiddleware.verifyAdmin, 
  body('username').isString().notEmpty().withMessage("Le nom d'utilisateur est requis"),
  body('password').isString().notEmpty().withMessage('Le mot de passe est requis'),
  adminController.createTechnician
);

// Exporter le routeur
module.exports = router;