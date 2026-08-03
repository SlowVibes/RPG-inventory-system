import type { Weapon } from "./weapon";
import type { Armor } from "./armor";
import type { Ring } from "./ring";

export class Equipment {
  public weapon: Weapon | null = null;
  public armor: Armor | null = null;
  public ring: Ring | null = null;
}
