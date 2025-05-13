from domain.location_item import LocationItem

class InMemoryLocationRepository:
    def __init__(self):
        self.items = []
        self.next_id = 1

    def add_item(self, name):
        item = LocationItem(self.next_id, name)
        self.items.append(item)
        self.next_id += 1
        return item

    def get_all_items(self):
        return self.items

    def find_by_id(self, id):
        return next((item for item in self.items if item.id == id), None)