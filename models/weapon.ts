import { Character } from "./character";
import { Item } from "./item";
import { ItemType } from "./itemtype";

export class Weapon extends Item {
  constructor(
    id: number,
    name: string,
    weight: number,
    value: number,
    public damage: number,
    public durability: number,
  ) {
    super(id, name, weight, value, ItemType.Weapon);
  }

  use(_character: Character): boolean {
    return true;
  }

  reduceDurability(amount: number): boolean {
    if (amount <= 0) {
      return false;
    }
    const previousDurability = this.durability;

    this.durability = Math.max(0, this.durability - amount);

    return this.durability !== previousDurability;
  }

  attack(): number {
    if (!this.reduceDurability(1)) {
      return 0;
    }
    return this.damage;
  }
}
