import { Item } from "./item";

export class Inventory {
  constructor(
    public items: Item[] = [],
    public weightLimit: number = 50,
  ) {}

  addItem(item: Item): void {
    if (
      this.items.reduce(
        (totalWeight, currentItem) => totalWeight + currentItem.weight,
        0,
      ) +
        item.weight >
      this.weightLimit
    ) {
      console.log(
        `Cannot add item to inventory: ${item.name} (ID: ${item.id}). Weight limit exceeded.`,
      );
      return;
    }
    this.items.push(item);

    console.log(`Adding item to inventory: ${item.name} (ID: ${item.id})`);
  }

  // to-do: change class to boolean to indicate success or failure
  dropItem(id: number): void {
    this.items = this.items.filter((item) => item.id !== id);
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
}
