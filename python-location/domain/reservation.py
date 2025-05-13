class Reservation:
    def __init__(self, item, start_date, end_date):
        if (end_date - start_date).days < 1:
            raise ValueError("Durée minimum : 1 jour.")

        if not item.is_available(start_date, end_date):
            raise ValueError("L'objet est déjà réservé à cette période.")

        self.item = item
        self.start_date = start_date
        self.end_date = end_date

        item.add_reservation(start_date, end_date)