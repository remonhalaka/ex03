const Ticket = require('../models/ticketModel');
const { validationResult } = require('express-validator');

// Créer un nouveau ticket
exports.createTicket = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, status, userId, technicianId, createdAt, closedAt } = req.body;

    try {
        const newTicket = await Ticket.create({
            title,
            description,
            status,
            userId,
            technicianId,
            createdAt,
            closedAt
        });
        res.status(201).json(newTicket);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création du ticket', error });
    }
};

// Récupérer tous les tickets
exports.getAllTickets = async (req, res) => {
    const userRole = req.user.role; // Supposons que le rôle de l'utilisateur est défini dans la requête après l'authentification
    const userId = req.user.id;

    try {
        let tickets;
        if (userRole === 'technician') {
            tickets = await Ticket.findAll(); // Récupérer tous les tickets pour les techniciens
        } else {
            tickets = await Ticket.findAll({ where: { userId } }); // Récupérer les tickets de l'utilisateur
        }
        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des tickets', error });
    }
};

// Récupérer un ticket par son ID
exports.getTicketById = async (req, res) => {
    const { id } = req.params;

    try {
        const ticket = await Ticket.findByPk(id);
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket introuvable' });
        }
        res.status(200).json(ticket);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération du ticket', error });
    }
};

// Mettre à jour un ticket
exports.updateTicket = async (req, res) => {
    const { id } = req.params;
    const { title, description, status, technicianId, closedAt } = req.body;

    try {
        const ticket = await Ticket.findByPk(id);
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket introuvable' });
        }

        // Mettre à jour les champs du ticket
        ticket.title = title || ticket.title;
        ticket.description = description || ticket.description;
        ticket.status = status || ticket.status;
        ticket.technicianId = technicianId || ticket.technicianId;
        ticket.closedAt = closedAt || ticket.closedAt;

        await ticket.save();
        res.status(200).json(ticket);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour du ticket', error });
    }
};