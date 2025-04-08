const knex = require('../utils/db');

class Ticket {
    constructor(titre, description, statut, utilisateurId, technicienId = null, creeLe = new Date(), fermeLe = null) {
        this.titre = titre;
        this.description = description;
        this.statut = statut;
        this.utilisateurId = utilisateurId;
        this.technicienId = technicienId;
        this.creeLe = creeLe;
        this.fermeLe = fermeLe;
    }

    // Méthode pour créer un ticket
    static async creer(ticketData) {
        const [ticketId] = await knex('tickets').insert(ticketData).returning('id');
        return ticketId;
    }

    // Méthode pour trouver un ticket par son ID
    static async trouverParId(ticketId) {
        return await knex('tickets').where({ id: ticketId }).first();
    }

    // Méthode pour mettre à jour un ticket
    static async mettreAJour(ticketId, modifications) {
        await knex('tickets').where({ id: ticketId }).update(modifications);
    }

    // Méthode pour supprimer un ticket
    static async supprimer(ticketId) {
        await knex('tickets').where({ id: ticketId }).del();
    }

    // Méthode pour récupérer tous les tickets
    static async trouverTous(utilisateurId, role) {
        if (role === 'technician') {
            return await knex('tickets');
        }
        return await knex('tickets').where({ userId: utilisateurId });
    }
}

module.exports = Ticket;