const express = require('express');
const { body, param } = require('express-validator');
const ticketController = require('../controllers/ticketController');
const authMiddleware = require('../middlewares/authMiddleware');
const validationMiddleware = require('../middlewares/validationMiddleware');

const router = express.Router();

// Créer un nouveau ticket
router.post(
  '/',
  authMiddleware.verifyToken,
  [
    body('title').isString().notEmpty().withMessage('Le titre est requis'),
    body('description').isString().notEmpty().withMessage('La description est requise'),
    body('status').isIn(['open', 'in progress', 'closed']).withMessage('Le statut doit être : open, in progress, closed'),
    body('userId').isInt({ gt: 0 }).withMessage("L'ID de l'utilisateur doit être un entier positif"),
    body('technicianId').optional().isInt({ gt: 0 }).withMessage("L'ID du technicien doit être un entier positif ou null"),
    body('createdAt').isISO8601().withMessage('La date de création doit être une date valide'),
    body('closedAt').optional().isISO8601().withMessage('La date de fermeture doit être une date valide ou null'),
  ],
  validationMiddleware.validate,
  ticketController.createTicket
);

// Récupérer tous les tickets
router.get(
  '/',
  authMiddleware.verifyToken,
  ticketController.getAllTickets
);

// Récupérer un ticket par son ID
router.get(
  '/:id',
  authMiddleware.verifyToken,
  param('id').isInt({ gt: 0 }).withMessage("L'ID du ticket doit être un entier positif"),
  validationMiddleware.validate,
  ticketController.getTicketById
);

// Mettre à jour un ticket
router.put(
  '/:id',
  authMiddleware.verifyToken,
  param('id').isInt({ gt: 0 }).withMessage("L'ID du ticket doit être un entier positif"),
  [
    body('status').optional().isIn(['open', 'in progress', 'closed']).withMessage('Le statut doit être : open, in progress, closed'),
    body('technicianId').optional().isInt({ gt: 0 }).withMessage("L'ID du technicien doit être un entier positif ou null"),
    body('closedAt').optional().isISO8601().withMessage('La date de fermeture doit être une date valide ou null'),
  ],
  validationMiddleware.validate,
  ticketController.updateTicket
);

// Supprimer un ticket
router.delete(
  '/:id',
  authMiddleware.verifyToken,
  param('id').isInt({ gt: 0 }).withMessage("L'ID du ticket doit être un entier positif"),
  validationMiddleware.validate,
  ticketController.deleteTicket
);

module.exports = router;