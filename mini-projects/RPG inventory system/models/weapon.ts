import { Character } from "./character";
import { Item } from "./item";

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

  use(character: Character): boolean {
    return true;
  };
}
