import { body, validationResult } from 'express-validator';

const reglesValidationTicket = () => {
    return [
        body('title').isString().notEmpty().withMessage('Le titre est requis et doit être une chaîne de caractères.'),
        body('description').isString().notEmpty().withMessage('La description est requise et doit être une chaîne de caractères.'),
        body('status').isIn(['open', 'in progress', 'closed']).withMessage('Le statut doit être l\'un des suivants : open, in progress, closed.'),
        body('userId').isInt({ gt: 0 }).withMessage('L\'ID de l\'utilisateur doit être un entier positif.'),
        body('technicianId').optional().isInt({ gt: 0 }).withMessage('L\'ID du technicien doit être un entier positif ou null.'),
        body('createdAt').isISO8601().withMessage('La date de création doit être une date valide.'),
        body('closedAt').optional().isISO8601().custom((value, { req }) => {
            if (value && new Date(value) <= new Date(req.body.createdAt)) {
                throw new Error('La date de fermeture doit être supérieure à la date de création si elle est fournie.');
            }
            return true;
        }).withMessage('La date de fermeture doit être une date valide ou null.'),
    ];
};

const valider = (req, res, next) => {
    const erreurs = validationResult(req);
    if (!erreurs.isEmpty()) {
        return res.status(400).json({ errors: erreurs.array() });
    }
    next();
};

export { reglesValidationTicket, valider };