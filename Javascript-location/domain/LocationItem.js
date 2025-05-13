class LocationItem {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.reservations = []; // La liste des périodes réservées 
  }

  isAvailable(startDate, durationDays) {
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + durationDays);

    return !this.reservations.some(({ start, end }) => {
      return (
        (start <= endDate && end >= startDate)
      );
    });
  }

  addReservation(startDate, durationDays) {
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + durationDays);

    this.reservations.push({ start: startDate, end: endDate });
  }
}

module.exports = LocationItem;