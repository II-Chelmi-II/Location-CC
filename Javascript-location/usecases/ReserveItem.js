const Reservation = require("../domain/Reservation.js");

function reserveItem(item, startDateStr, durationDays) {
  const startDate = new Date(startDateStr);

  try {
    const reservation = new Reservation(item, startDate, durationDays);
    return { success: true, message: "Réservation réussie." };
  } catch (err) {
    return { success: false, message: err.message };
  }
}

module.exports = reserveItem;