import { Character } from "./character";
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
    super(id, name, weight, value, ItemType.Potion);
  }

  use(character: Character): boolean {
    const healed = character.healCharacter(this.healthRestoration);
    const restoredMana = character.restoreMana(this.manaRestoration);

    return healed || restoredMana;
  }
}
