class Reservation {
  constructor(item, startDate, durationDays) {
    if (durationDays < 1) {
      throw new Error("Durée minimum : 1 jour.");
    }

    if (!item.isAvailable(startDate, durationDays)) {
      throw new Error("L'objet est déjà réservé à cette période.");
    }

    this.item = item;
    this.startDate = startDate;
    this.durationDays = durationDays;

    item.addReservation(startDate, durationDays);
  }
}

module.exports = Reservation;