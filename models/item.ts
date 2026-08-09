import type { Character } from "./character";
import { ItemType } from "./itemtype";

export abstract class Item {
  constructor(
    public id: number,
    public name: string,
    public weight: number,
    public value: number,
    public type: ItemType 
  ) {}

  abstract use(character: Character): boolean;
}
