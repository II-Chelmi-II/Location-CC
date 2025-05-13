const LocationItem = require("../domain/LocationItem.js");

class InMemoryLocationRepository {
  constructor() {
    this.items = [];
  }

  addItem(name) {
    const item = new LocationItem(this.items.length + 1, name);
    this.items.push(item);
    return item;
  }

  getAllItems() {
    return this.items;
  }

  findById(id) {
    return this.items.find(item => item.id === id);
  }
}

module.exports = InMemoryLocationRepository;