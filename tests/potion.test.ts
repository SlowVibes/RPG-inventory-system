import { describe, expect, it } from "vitest";
import { Potion } from "../models/potion";
import { Character } from "../models/character";

describe("Potion", () => {
  it("restores health when using a health potion", () => {
    const hero = new Character("Test Conan");
    const potion = new Potion(1, "Health Potion", 1, 10, 20, 0);

    hero.currentHealth = 50;
    hero.pickUpItem(potion);

    const result = hero.useItem(potion.id);

    expect(result).toBe(true);
    expect(hero.currentHealth).toBe(70);
    expect(hero.inventory.getItemById(potion.id)).toBeUndefined();
  });

  it("potion not consumed, if health is full", () => {
    const hero = new Character("Test Conan");
    const potion = new Potion(1, "Health Potion", 1, 10, 20, 0);

    hero.currentHealth = 100;
    hero.pickUpItem(potion);

    const result = hero.useItem(potion.id);

    expect(result).toBe(false);
    expect(hero.currentHealth).toBe(100);
    expect(hero.inventory.getItemById(potion.id)).toBe(potion);
  });

  it("restores mana when using a mana potion", () => {
    const hero = new Character("Test Conan");
    const potion = new Potion(1, "Mana Potion", 1, 10, 0, 20);

    hero.currentMana = 30;
    hero.pickUpItem(potion);

    const result = hero.useItem(potion.id);

    expect(result).toBe(true);
    expect(hero.currentMana).toBe(50);
    expect(hero.inventory.getItemById(potion.id)).toBeUndefined();
  });

  it("consumes a potion if at least one effect changes the character state", () => {
    const hero = new Character("Test Conan");
    const potion = new Potion(1, "Super Potion", 1, 20, 20, 20);

    hero.currentHealth = hero.maxHealth;
    hero.currentMana = 20;

    hero.pickUpItem(potion);

    const result = hero.useItem(potion.id);

    expect(result).toBe(true);
    expect(hero.currentHealth).toBe(hero.maxHealth);
    expect(hero.currentMana).toBe(40);
    expect(hero.inventory.getItemById(potion.id)).toBeUndefined();
  });

  it("does not consume a potion if neither effect changes the character state", () => {
    const hero = new Character("Test Conan");
    const potion = new Potion(1, "Super Potion", 1, 20, 20, 20);

    hero.currentHealth = hero.maxHealth;
    hero.currentMana = hero.maxMana;

    hero.pickUpItem(potion);

    const result = hero.useItem(potion.id);

    expect(result).toBe(false);
    expect(hero.currentHealth).toBe(hero.maxHealth);
    expect(hero.currentMana).toBe(hero.maxMana);
    expect(hero.inventory.getItemById(potion.id)).toBe(potion);
  });
});
