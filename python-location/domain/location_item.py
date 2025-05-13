from datetime import timedelta

class LocationItem:
    def __init__(self, id, name):
        self.id = id
        self.name = name
        self.reservations = []

    def is_available(self, start_date, end_date):
        for res in self.reservations:
            if not (end_date < res['start'] or start_date > res['end']):
                return False
        return True

    def add_reservation(self, start_date, end_date):
        self.reservations.append({'start': start_date, 'end': end_date})

    def get_active_reservations(self, now):
        return [res for res in self.reservations if res['end'] >= now]