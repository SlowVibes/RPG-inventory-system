import { ItemType } from "./itemtype";

import type { Weapon } from "./weapon";
import type { Armor } from "./armor";
import type { Ring } from "./ring";
import type { Item } from "./item";

export class Equipment {
  public weapon: Weapon | null = null;
  public armor: Armor | null = null;
  public ring: Ring | null = null;
  
  equip (item: Item): boolean {

      switch (item.type) {

        case ItemType.Weapon:
          this.weapon = item as Weapon;
          return true;

        case ItemType.Armor:
          this.armor = item as Armor;
          return true;

        case ItemType.Ring:
          this.ring = item as Ring;
          return true;

        default:
          return false;
      }
}

}