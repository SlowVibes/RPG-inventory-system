import { describe, expect, it } from "vitest";
import { Character } from "../models/character";
import { Shop } from "../models/shop";
import { Weapon } from "../models/weapon";
import { Inventory } from "../models/inventory";

describe("Shop", () => {
    it("buys an item when the character has enough gold and inventory space", () =>{
        const hero = new Character("Test Conan");
        const sword = new Weapon(1, "Magic Sword", 5, 100, 25, 150);
        const shop = new Shop([sword]);

        const result = shop.buyItem(sword.id, hero);

        expect(result).toBe(true);
        expect(hero.gold).toBe(700);
        expect(hero.inventory.getItemById(sword.id)).toBe(sword);
        expect(shop.getItemById(sword.id)).toBeUndefined();
    });

    it("insufficient gold to buy the item", () =>{
        const hero = new Character("Test Conan");
        const sword = new Weapon(1, "Magic Sword", 5, 1500, 25, 150);
        const shop = new Shop([sword]);

        const result = shop.buyItem(sword.id, hero);
        expect(hero.inventory.canAddItem(sword)).toBe(true);

        expect(result).toBe(false);
        expect(hero.gold).toBe(800);
        expect(hero.inventory.getItemById(sword.id)).toBeUndefined();
        expect(shop.getItemById(sword.id)).toBe(sword);
    });

    it("the item is too heavy to buy and get to inventory", () =>{
        const hero = new Character("Test Conan");
        const sword = new Weapon(1, "Magic Sword", 500, 100, 25, 1500);
        const shop = new Shop([sword]);

        const result = shop.buyItem(sword.id, hero);

        expect(hero.inventory.canAddItem(sword)).toBe(false);
        expect(result).toBe(false);
        expect(hero.gold).toBe(800);
        expect(hero.inventory.getItemById(sword.id)).toBeUndefined();
        expect(shop.getItemById(sword.id)).toBe(sword);
    });

    it("sells an item from the inventory to the shop", () => {
        const hero = new Character("Test Conan");
        const sword = new Weapon(1, "Magic Sword", 10, 200, 25, 200);
        const shop = new Shop([]);

        hero.pickUpItem(sword);

        const result = shop.sellItem(sword.id, hero);

        expect(result).toBe(true);
        expect(hero.inventory.getItemById(sword.id)).toBeUndefined();
        expect(hero.gold).toBe(900);
        expect(shop.getItemById(sword.id)).toBe(sword);
    });

    it("fails to sell an item that is not in inventory", () => {
        const hero = new Character("Test Conan");
        const shop = new Shop([]);

        const result = shop.sellItem(1, hero);

        expect(result).toBe(false);
        expect(hero.inventory.getItemById(1)).toBeUndefined();
        expect(hero.gold).toBe(800);
        expect(shop.getItemById(1)).toBeUndefined();
    });
});