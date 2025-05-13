const reserveItem = require("../usecases/ReserveItem");

function showMenu() {
  console.log("\n--- Menu ---");
  console.log("1. Voir les objets disponibles");
  console.log("2. Réserver un objet");
  console.log("3. Voir les réservations actives");
  console.log("4. Quitter\n");
}

function startCLI(repo) {
  const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
  });

  function mainMenu() {
    showMenu();
    readline.question("Choisissez une option: ", option => {
      switch (option.trim()) {
        case "1":
          repo.getAllItems().forEach(item => {
            console.log(`${item.id}. ${item.name}`);
          });
          mainMenu();
          break;
        case "2":
          handleReservation(readline, repo, mainMenu);
          break;
        case "3":
          showActiveReservations(repo);
          mainMenu();
          break;
        case "4":
          console.log("Fermeture de l'application.");
          readline.close();
          break;
        default:
          console.log("Option invalide.");
          mainMenu();
      }
    });
  }

  mainMenu();
}

function handleReservation(rl, repo, callback) {
  console.log("\n--- Nouvelle réservation ---");
  repo.getAllItems().forEach(item => console.log(`${item.id}. ${item.name}`));

  rl.question("Entrez l'ID de l'objet : ", id => {
    const item = repo.findById(parseInt(id));
    if (!item) {
      console.log("Objet non trouvé.");
      return callback();
    }
    rl.question("Date de début (YYYY-MM-DD) : ", start => {
      rl.question("Date de fin (YYYY-MM-DD) : ", end => {
        const result = reserveItem(item, start, end);
        if (!result.success && result.message.includes("déjà réservé")) {
          const nextAvailable = item.getActiveReservations(new Date()).map(res =>
            `du ${res.start.toDateString()} au ${res.end.toDateString()}`
          );
          console.log(result.message);
          console.log("Périodes prises :", nextAvailable.join(", "));
        } else {
          console.log(result.message);
        }
        callback();
      });
    });
  });
}

function showActiveReservations(repo) {
  console.log("\n--- Réservations Actives ---");
  const now = new Date();
  repo.getAllItems().forEach(item => {
    const actives = item.getActiveReservations(now);
    if (actives.length > 0) {
      console.log(`\n${item.name} :`);
      actives.forEach(res => {
        console.log(`  - du ${res.start.toDateString()} au ${res.end.toDateString()}`);
      });
    }
  });
}

module.exports = startCLI;