class LocationItem {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.reservations = []; // Liste des réservations avec { start, end }
  }

  isAvailable(startDate, durationDays) {
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + durationDays);

    return !this.reservations.some(({ start, end }) => {
      return start <= endDate && end >= startDate;
    });
  }

  addReservation(startDate, durationDays) {
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + durationDays);

    this.reservations.push({ start: new Date(startDate), end: endDate });
  }

  getActiveReservations(referenceDate = new Date()) {
    return this.reservations.filter(({ end }) => end >= referenceDate);
  }
}

module.exports = LocationItem;