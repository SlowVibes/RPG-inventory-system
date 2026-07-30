import { Item } from "./item";

export class Inventory {
  constructor(
    public items: Item[] = [],
    public weightLimit: number = 40,
  ) {}

  addItem(item: Item): boolean {
    if (this.getCurrentWeight() + item.weight > this.weightLimit) {
      return false;
    }

    this.items.push(item);

    return true;
  }

  dropItem(id: number): boolean {
    const initialLength = this.items.length;
    this.items = this.items.filter((item) => item.id !== id);
    return this.items.length < initialLength;
  }

  listItems(): void {
    console.log("Inventory items:");
    this.items.forEach((item) => {
      console.log(`- ${item.name} (ID: ${item.id})`);
    });
  }

  searchItemById(id: number): Item | undefined {
    return this.items.find((item) => item.id === id);
  }

  private getCurrentWeight(): number {
    return this.items.reduce(
      (totalWeight, currentItem) => totalWeight + currentItem.weight,
      0,
    );
  }
}
