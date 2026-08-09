import type { Item } from "./item";

export class Inventory {
  constructor(
    public items: Item[] = [],
    public weightLimit: number = 40,
  ) {}

  addItem(item: Item): boolean {
    if (this.getCurrentWeight() + item.weight > this.weightLimit) {
      return false;
    }

    if (!this.canAddItem(item)) {
      return false;
    }

    this.items.push(item);

    return true;
  }

  removeItem(id: number): boolean {
    const item = this.getItemById(id);

    if (!item) {
      return false;
    }
    // May refactor to findIndex
    this.items = this.items.filter((item) => item.id !== id);

    return true;
  }

  getItemById(id: number): Item | undefined {
    return this.items.find((item) => item.id === id);
  }

  private getCurrentWeight(): number {
    return this.items.reduce(
      (totalWeight, currentItem) => totalWeight + currentItem.weight,
      0,
    );
  }

  canAddItem(item: Item): boolean {
    return this.getCurrentWeight() + item.weight <= this.weightLimit;
  }
}
