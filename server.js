const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./src/utils/db');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
const authRoutes = require('./src/routes/authRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const ticketRoutes = require('./src/routes/ticketRoutes');

app.use('/api/auth', authRoutes); // Routes pour l'authentification
app.use('/api/admin', adminRoutes); // Routes pour les administrateurs
app.use('/api/tickets', ticketRoutes); // Routes pour les tickets

// Démarrage du serveur
db.initializeDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Le serveur fonctionne sur http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('Erreur lors de l\'initialisation de la base de données :', err);
  });