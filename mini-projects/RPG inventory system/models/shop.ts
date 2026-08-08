import { Item } from "./item";
import { Character } from "./character";

export class Shop {
  constructor(public items: Item[] = []) {}

  getItemById(id: number): Item | undefined {
    return this.items.find((item) => item.id === id);
  }

  buyItem(id: number, character: Character): boolean {
    const item = this.getItemById(id);

    if (!item) {
      return false;
    }

    const addedToInventory = character.pickUpItem(item);

    if (!addedToInventory) {
      return false;
    }

    const paid = character.spendGold(item.value);

    if (!paid) {
      character.removeItem(item.id);
      return false;
    }

    this.removeItem(item.id);
    return true;
  }

  sellItem(id: number, character: Character): boolean {
    const item = character.inventory.getItemById(id);

    if (!item) {
      return false;
    }

    const sellValue = Math.floor(item.value / 2);

    const removedItem = character.removeItem(item.id);

    if (!removedItem) {
      return false;
    }

    this.items.push(item);

    character.addGold(sellValue);

    return true;
  }

  removeItem(id: number): boolean {
    const item = this.getItemById(id);

    if (!item) {
      return false;
    }

    this.items = this.items.filter((item) => item.id !== id);
    return true;
  }
}
