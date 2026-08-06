import { Character } from "./models/character";
import { Weapon } from "./models/weapon";
import { Armor } from "./models/armor";
import { Ring } from "./models/ring";
import { Potion } from "./models/potion";

const hero = new Character("Conan");

const sword = new Weapon(1, "Sword", 5, 100, 10, 100);
const armor = new Armor(2, "Armor", 10, 150, 20, 100);
const ring = new Ring(3, "Strength Ring", 1, 200, 5, 10);

const sword2 = new Weapon(4, "Sword2", 5, 100, 2500, 100);

hero.pickUpItem(sword);
hero.pickUpItem(armor);
hero.pickUpItem(ring);
hero.pickUpItem(sword2);

console.log("Before equipment:");
console.log(`Attack: ${hero.getAttack()}`);
console.log(`Defense: ${hero.getDefense()}`);
console.log(`Strength: ${hero.getStrength()}`); 

hero.equipItem(sword.id);
hero.equipItem(armor.id);
hero.equipItem(ring.id);

console.log("After equipment:");
console.log(`Attack: ${hero.getAttack()}`);
console.log(`Defense: ${hero.getDefense()}`);
console.log(`Strength: ${hero.getStrength()}`);

console.log("Equip Sword2:", hero.equipItem(sword2.id));
console.log("Current weapon:", hero.equipment.weapon?.name);
console.log("Current attack:", hero.getAttack());

console.log(
  "Old sword returned:",
  hero.inventory.getItemById(sword.id)?.name,
);

console.log(
  "Sword2 still in inventory:",
  hero.inventory.getItemById(sword2.id),
);