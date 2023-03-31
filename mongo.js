const MongoClient = require('mongodb').MongoClient;

// URL de la base de données
const url = 'mongodb://localhost:27017/mongolisation';

// Options de connexion
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Connexion à la base de données
MongoClient.connect(url, options, function(err, client) {
  if (err) throw err;

  // Récupération de la collection clients
  const collection = client.db().collection('mes_clients');

  // Requête de tous les documents de la collection clients
  collection.find({}).toArray(function(err, docs) {
    if (err) throw err;

    console.log('Liste des clients :');
    console.log(docs);

    // Fermeture de la connexion à la base de données
    client.close();
  });
});
