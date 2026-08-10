import { describe, expect, it } from "vitest";
import { Character } from "../models/character";
import { Enemy } from "../models/enemy"
import { Weapon } from "../models/weapon"

describe("Combat", () => {
    it("damages an enemy when the hero attack with a weapon", () => {
        const hero = new Character("Test Conan");
        const enemy = new Enemy ("Test Goblin", 100, 100, 0, 0, 20, 20);


        const sword = new Weapon(1, "Sword", 5, 100, 20, 100);

        hero.pickUpItem(sword);
        hero.equipItem(1);

        const result = hero.attack(enemy);

        expect(result).toBe(true);
        expect(enemy.currentHealth).toBe(80);
    });

    it ("reduces incoming damage based on enemy defense", () => {
        const hero = new Character("Test Conan");
        const enemy = new Enemy ("Test Goblin", 100, 100, 0, 5, 20, 20);


        const sword = new Weapon(1, "Sword", 5, 100, 20, 100);

        hero.pickUpItem(sword);
        hero.equipItem(1);

        const result = hero.attack(enemy);

        expect(result).toBe(true);
        expect(enemy.currentHealth).toBe(85);
    });

    it ("reduces weapon durability after an attack", () => {
        const hero = new Character("Test Conan");
        const enemy = new Enemy("Test Goblin", 100, 100, 15, 0, 20, 20);
        const sword = new Weapon(1, "Rusty Sword", 5, 10, 5, 100);

        hero.pickUpItem(sword);
        hero.equipItem(1);

        const result = hero.attack(enemy);

        expect(result).toBe(true);
        expect(sword.durability).toBe(99);
    });

    it ("attack is failing due to weapon has 0 durability", () => {
        const hero = new Character("Test Conan");
        const enemy = new Enemy("Test Goblin", 100, 100, 5, 0, 20, 20);
        const sword = new Weapon(1, "Rusty Sword", 5, 10, 5, 0);

        hero.pickUpItem(sword);
        hero.equipItem(1);

        const result = hero.attack(enemy);

        expect(result).toBe(false);
        expect(enemy.currentHealth).toBe(100);
    });

    it ("attack is failing due to enemy is dead", () => {
        const hero = new Character("Test Conan");
        const enemy = new Enemy("Test Goblin", 100, 0, 5, 0, 20, 20);
        const sword = new Weapon(1, "Rusty Sword", 5, 10, 5, 10);

        hero.pickUpItem(sword);
        hero.equipItem(1);

        const result = hero.attack(enemy);

        expect(result).toBe(false);
        expect(enemy.isDead()).toBe(true);
        expect(sword.durability).toBe(10);
    });

    it("gain experience and gold after enemy dies", () => {
        const hero = new Character("Test Conan");
        const enemy = new Enemy("Test Goblin", 100, 5, 5, 0, 20, 20);
        const sword = new Weapon(1, "Rusty Sword", 5, 10, 5, 10);

        hero.pickUpItem(sword);
        hero.equipItem(1);

        const result = hero.attack(enemy);

        expect(result).toBe(true);
        expect(enemy.isDead()).toBe(true);
        
        expect(hero.gold).toBe(820);
        expect(hero.experience).toBe(15);
        expect(hero.level).toBe(2);
    });
})