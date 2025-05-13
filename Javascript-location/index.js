const InMemoryLocationRepository = require('./infrastructure/InMemoryLocationRepository');
const startCLI = require('./presentation/cli');

// Création du dépôt mémoire
const repo = new InMemoryLocationRepository();

// Ajout d'objets à louer
repo.addItem("Voiture Tesla Model Y");
repo.addItem("Appartement à Antananarivo");
repo.addItem("Appareil photo Canon EOS");
repo.addItem("Drone DJI Mini 3 Pro");
repo.addItem("Service de sonorisation");

// Lancement de l'application CLI
startCLI(repo);