const InMemoryLocationRepository = require("./infrastructure/InMemoryLocationRepository.js");
const ReserveItem = require("./usecases/ReserveItem.js");

const repo = new InMemoryLocationRepository();

// Création d'objets
const car = repo.addItem("Voiture");
const plate = repo.addItem("Assiette");
const house = repo.addItem("Maison");

// Cas 1: Réservation valide
let result = ReserveItem(car, "2025-05-10", 3);
console.log(result); // Réservation réussie

// Cas 2: Conflit de réservation (voiture déjà prise)
result = ReserveItem(car, "2025-05-11", 2);
console.log(result); // Conflit

// Cas 3: Réservation après fin de la précédente
result = ReserveItem(car, "2025-05-14", 2);
console.log(result); // Réservation réussie

// Cas 4: Durée invalide
result = ReserveItem(house, "2025-05-10", 0);
console.log(result); // Erreur durée

// Cas 5: Réservation d’un autre objet
result = ReserveItem(plate, "2025-05-12", 1);
console.log(result); // Réservation réussie