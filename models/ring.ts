import { Character } from "./character";
import { Item } from "./item";
import { ItemType } from "./itemtype";

export class Ring extends Item {
  constructor(
    id: number,
    name: string,
    weight: number,
    value: number,
    public bonusStrength: number,
    public bonusHealth: number,
  ) {
    super(id, name, weight, value, ItemType.Ring);
  }

  use(_character: Character): boolean {
      return true;
    };
}
