#!/bin/bash

# Nettoyer la base de données
mongo mongolisation --eval "db.dropDatabase()"

# Créer la base de données
mongo mongolisation --eval "db.createCollection('idf')"

# Importer les données dans la collection 'idf'
mongoimport --db mongolisation --collection idf --file idf.geojson --jsonArray

# Installer les modules Node.js
npm install

# Lancer le serveur
node server.js