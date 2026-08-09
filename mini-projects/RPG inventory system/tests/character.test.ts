import { describe, expect, it } from "vitest";
import { Character } from "../models/character";
import { Weapon } from "../models/weapon";
import { Potion } from "../models/potion";

describe("Character", () => {
  it("heals the character without exceeding max health", () => {
    const hero = new Character("Conan");

    hero.currentHealth = 60;

    const result = hero.healCharacter(20);

    expect(result).toBe(true);
    expect(hero.currentHealth).toBe(80);
  });

  it("does not heal above max health", () => {
    const hero = new Character("Test Conan");

    const result = hero.healCharacter(20);

    expect(result).toBe(false);
    expect(hero.currentHealth).toBe(100);
  });

  it("restores mana without exceeding max mana", () => {
    const hero = new Character("Test Conan");

    const result = hero.restoreMana(20);

    expect(result).toBe(false);
    expect(hero.currentMana).toBe(50);
  });

  it("gains experience without leveling up", () => {
    const hero = new Character("Test Conan");

    const result = hero.gainExperience(4);

    expect(result).toBe(true);
    expect(hero.experience).toBe(14);
    expect(hero.level).toBe(1);
  });

  it("levels up when experience exceeds threshold", () => {
    const hero = new Character("Test Conan");

    const result = hero.gainExperience(30);

    expect(result).toBe(true);
    expect(hero.level).toBe(3);
    expect(hero.experience).toBe(3);
    expect(hero.experienceToNextLevel).toBe(33);
  });

  it("does not gain experience when xp is zero or negative", () => {
    const hero = new Character("Test Conan");

    const initialExperience = hero.experience;
    const initialLevel = hero.level;

    const result = hero.gainExperience(0);
    const negativeResult = hero.gainExperience(-10);

    expect(result).toBe(false);
    expect(negativeResult).toBe(false);
    expect(hero.experience).toBe(initialExperience);
    expect(hero.level).toBe(initialLevel);
  });

  it("returns the previous weapon to inventory when equipping a new weapon", () => {
    const hero = new Character("Test Conan");

    const sword = new Weapon(1, "Sword", 5, 100, 20, 100);
    const polearm = new Weapon(2, "Polearm", 15, 125, 35, 120);

    hero.pickUpItem(sword);
    hero.pickUpItem(polearm);

    hero.equipItem(sword.id);
    const result = hero.equipItem(polearm.id);

    expect(result).toBe(true);
    expect(hero.equipment.weapon).toBe(polearm);
    expect(hero.inventory.getItemById(2)).toBeUndefined();
    expect(hero.inventory.getItemById(1)).toBe(sword);
  });

  it("trying to equip a potion, testing all equipment slots to remain undefined", () => {
    const hero = new Character("Test Conan");

    const potion = new Potion(1, "Health Potion", 5, 10, 5, 0);

    hero.pickUpItem(potion);

    const result = hero.equipItem(potion.id);

    expect(result).toBe(false);

    expect(hero.equipment.weapon).toBeNull();
    expect(hero.equipment.armor).toBeNull();
    expect(hero.equipment.ring).toBeNull();

    expect(hero.inventory.getItemById(1)).toBe(potion);
  });
});
