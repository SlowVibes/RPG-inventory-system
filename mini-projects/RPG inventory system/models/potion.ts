import { Item } from "./item";

export class Potion extends Item {
  constructor(
    id: number,
    name: string,
    weight: number,
    value: number,
    public healthRestoration: number,
    public manaRestoration: number,
  ) {
    super(id, name, weight, value);
  }
}
