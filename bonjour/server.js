const express = require("express");
const mysql = require('mysql');
const path = require('path');
const app = express();
const hbs = require('hbs');



//-npm init --yes
//2-npm install express mysql2 hbs

// Création de la connexion à MySQL
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'statut'
});

connection.connect(); // se connecter à la base de données

// Configuration de Handlebars
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Définir le répertoire public pour les fichiers statiques (CSS, JS, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Route pour récupérer et afficher les statuts
app.get('/statut', function(req, res) {
  connection.query("SELECT * from statut ", function(errors, results, fields) {
    if (errors) {
      console.error(errors);
      res.status(500).send('Database query error');
    } else {
      res.render('statut', { statuts: results }); // Envoi des résultats à la vue
    }
  });
});

// Lancer le serveur
app.listen(3000, function() {
  console.log("Listening on port 3000");
});


/*var hbs = require('express-hbs');

// Use `.hbs` for extensions and find partials in `views/partials`.
app.engine('hbs', hbs.express4({
  partialsDir: __dirname + '/views/partials'
}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');   est intégré*/

