import { describe, expect, it } from "vitest";
import { Inventory } from "../models/inventory";
import { Weapon } from "../models/weapon";

describe("Inventory", () => {
  it("adds an item if it fits the weight limit", () => {
    const inventory = new Inventory();
    const sword = new Weapon(1, "Sword", 5, 100, 10, 100);

    const result = inventory.addItem(sword);

    expect(result).toBe(true);
    expect(inventory.getItemById(sword.id)).toBe(sword);
  });

  it("rejects an item if it exceeds the weight limit", () => {
    const inventory = new Inventory([], 10);
    const heavySword = new Weapon(2, "Heavy Sword", 15, 200, 20, 100);

    const result = inventory.addItem(heavySword);

    expect(result).toBe(false);
    expect(inventory.getItemById(heavySword.id)).toBeUndefined();
  });

  it ("returns false when trying to remove an item that does not exist", () => {
    const inventory = new Inventory();
    const sword = new Weapon(1, "Sword", 5, 100, 10, 100);

    const result = inventory.removeItem(sword.id);

    expect(result).toBe(false);
    expect(inventory.getItemById(sword.id)).toBeUndefined();
  });

    it("removes an item that exists in the inventory", () => {
    const inventory = new Inventory();
    const sword = new Weapon(1, "Sword", 5, 100, 10, 100);
    inventory.addItem(sword);

    const result = inventory.removeItem(sword.id);

    expect(result).toBe(true);
    expect(inventory.getItemById(sword.id)).toBeUndefined();
  });
});