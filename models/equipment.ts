import { ItemType } from "./itemtype";

import type { Weapon } from "./weapon";
import type { Armor } from "./armor";
import type { Ring } from "./ring";
import type { Item } from "./item";

type EquipResult = {
  equipped: boolean;
  previousItem: Item | null;
};

export class Equipment {
  public weapon: Weapon | null = null;
  public armor: Armor | null = null;
  public ring: Ring | null = null;

  equip(item: Item): EquipResult {
    switch (item.type) {
      case ItemType.Weapon: {
        const previousItem = this.weapon;
        this.weapon = item as Weapon;

        return {
          equipped: true,
          previousItem,
        };
      }

      case ItemType.Armor: {
        const previousItem = this.armor;
        this.armor = item as Armor;

        return {
          equipped: true,
          previousItem,
        };
      }

      case ItemType.Ring: {
        const previousItem = this.ring;
        this.ring = item as Ring;

        return {
          equipped: true,
          previousItem,
        };
      }

      default:
        return {
          equipped: false,
          previousItem: null,
        };
    }
  }
}
