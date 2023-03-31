const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;


// URL de la base de données
const url = 'mongodb://localhost:27017';
const dbName = 'mongolisation';
const client = new MongoClient(url);
var db;
var collection; 

// Configuration pour les fichiers JavaScript
app.get('*.js', function(req, res, next) {
  res.setHeader('Content-Type', 'text/javascript');
  next();
});



app.get('/node_modules/openlayers/dist/ol.js', function(req, res) {
  res.setHeader('Content-Type', 'text/javascript');
  res.sendFile(__dirname + '/node_modules/openlayers/dist/ol.js');
});



app.get('/data', function(req, res) {
  const collection = db.collection('idf');
  collection.find().toArray(function(err, data) {
    if (err) {
      console.log(err);
      res.status(500).send('Error occurred');
    } else {
      res.send({
        type: 'FeatureCollection',
        features: data,
      });
    }
  });
});

app.get('/map', function(req, res) {
  res.render('map');
});


app.use(express.static(__dirname+"/public"));
app.use(bodyParser.urlencoded({ extended: false }));

// Configuration de Pug comme moteur de template
app.set('view engine', 'pug');

// Définition de la route pour afficher le formulaire
app.get('/', (req, res) => {
  res.render('inscription');
});

app.get('/base', function(req, res) {
  res.render('base');
});

// Définition de la route pour traiter le formulaire
app.post('/', (req, res) => {
  const { firstName, lastName } = req.body;

  collection.insertOne({ prenom: req.body.prenom, nom: req.body.nom }, (err, result) => {
    if (err) {
      console.log(err);
      res.send('Erreur lors de l\'insertion des données');
    } else {
      collection.find({}).toArray((err, documents) => {
        if (err) {
          console.log(err);
          res.send('Erreur lors de la récupération des documents');
        } else {
          res.render('page', { prenom: req.body.prenom, nom: req.body.nom, documents: documents });
        }
      });
    }
  });
});

MongoClient.connect(url, (err, client) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connexion à la base de données réussie');
    db = client.db(dbName);
    collection = db.collection('idf');
    /*
    // Supprimer tous les documents de la collection "people"
    collection.deleteMany({}, function(err, result) {
      if (err) throw err;
      console.log('Base de données nettoyée');
      client.close();
    });*/
    

    // Démarrage du serveur
    app.listen(3000, () => {
      console.log('Serveur démarré sur le port 3000');
    });
  }
});


/*
// Lancement de l'application sur le port 3000
app.listen(3000, () => {
  console.log('Application démarrée sur le port 3000');
});
*/




