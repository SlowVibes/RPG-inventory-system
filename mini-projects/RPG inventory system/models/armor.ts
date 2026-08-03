import { Character } from "./character";
import { Item } from "./item";
import { ItemType } from "./itemtype";

export class Armor extends Item {
  constructor(
    id: number,
    name: string,
    weight: number,
    value: number,
    public defense: number,
    public durability: number,
  ) {
    super(id, name, weight, value, ItemType.Armor);
  }

  use(character: Character): boolean {
      return true;
  };
}
