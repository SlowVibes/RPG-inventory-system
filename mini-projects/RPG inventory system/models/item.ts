import { Character } from "./character";

export abstract class Item {
  constructor(
    public id: number,
    public name: string,
    public weight: number,
    public value: number,
  ) {}

  abstract use(character: Character): boolean;
}
