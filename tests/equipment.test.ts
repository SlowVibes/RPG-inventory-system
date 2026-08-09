import { describe, expect, it } from "vitest";
import { Equipment } from "../models/equipment";
import { Weapon } from "../models/weapon";
import { Character } from "../models/character";

describe("Equipment", () => {
  it("equips a weapon into the weapon slot", () => {
    const equipment = new Equipment();
    const sword = new Weapon(1, "Sword", 5, 100, 20, 100);

    const result = equipment.equip(sword);

    expect(result.equipped).toBe(true);
    expect(result.previousItem).toBeNull();
    expect(equipment.weapon).toBe(sword);
  });

  it("returns the previous weapon when equipping a new weapon", () => {
    const equipment = new Equipment();
    const sword = new Weapon(1, "Sword", 5, 100, 20, 100);
    const polearm = new Weapon(2, "Polearm", 15, 125, 35, 120);

    equipment.equip(sword);
    const result = equipment.equip(polearm);

    expect(result.equipped).toBe(true);
    expect(result.previousItem).toBe(sword);
    expect(equipment.weapon).toBe(polearm);
  });
});
