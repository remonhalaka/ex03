const Ticket = require('../models/ticketModel');
const User = require('../models/userModel');

// Fonction pour créer un ticket
const createTicket = async (ticketData) => {
    const { title, description, status, userId, technicianId, createdAt, closedAt } = ticketData;

    const newTicket = await Ticket.query().insert({
        title,
        description,
        status,
        userId,
        technicianId,
        createdAt,
        closedAt
    });

    return newTicket;
};

// Fonction pour récupérer tous les tickets
const getAllTickets = async (userId, role) => {
    if (role === 'technician') {
        return await Ticket.query();
    } else {
        return await Ticket.query().where('userId', userId);
    }
};

// Fonction pour récupérer un ticket par son ID
const getTicketById = async (ticketId) => {
    return await Ticket.query().findById(ticketId);
};

// Fonction pour mettre à jour un ticket
const updateTicket = async (ticketId, updateData) => {
    const updatedTicket = await Ticket.query().patchAndFetchById(ticketId, updateData);
    return updatedTicket;
};

// Fonction pour supprimer un ticket
const deleteTicket = async (ticketId) => {
    await Ticket.query().deleteById(ticketId);
};

module.exports = {
    createTicket,
    getAllTickets,
    getTicketById,
    updateTicket,
    deleteTicket
};