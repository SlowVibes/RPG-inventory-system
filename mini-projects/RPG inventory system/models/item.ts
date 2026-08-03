import type { Character } from "./character";

export abstract class Item {
  constructor(
    public id: number,
    public name: string,
    public weight: number,
    public value: number,
    public itemtype: ItemType 
  ) {}

  abstract use(character: Character): boolean;
}
