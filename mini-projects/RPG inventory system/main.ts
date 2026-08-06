import { Character } from "./models/character";
import { Weapon } from "./models/weapon";
import { Armor } from "./models/armor";
import { Ring } from "./models/ring";
import { Potion } from "./models/potion";

const hero = new Character("Conan");

const sword = new Weapon(1, "Sword", 5, 100, 10, 100);

hero.pickUpItem(sword);

const equipped = hero.equipItem(sword.id);

console.log(`Equipped: ${equipped}`);
console.log("Equipped weapon:", hero.equipment.weapon);
console.log("Item still in inventory:", hero.inventory.getItemById(sword.id));