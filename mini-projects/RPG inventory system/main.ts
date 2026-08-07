import { Character } from "./models/character";
import { Weapon } from "./models/weapon";
import { Armor } from "./models/armor";
import { Ring } from "./models/ring";
import { Potion } from "./models/potion";
import { Enemy } from "./models/enemy";

const hero = new Character("Conan");
const enemy  = new Enemy("Goblin", 10, 10);
const sword = new Weapon(1, "Sword", 5, 100, 5, 100);
const armor = new Armor(2, "Armor", 10, 150, 20, 100);
const ring = new Ring(3, "Strength Ring", 1, 200, 5, 10);

hero.pickUpItem(sword);
hero.pickUpItem(armor);
hero.pickUpItem(ring);

hero.equipItem(sword.id);
hero.equipItem(armor.id);
hero.equipItem(ring.id);

console.log("Enemy HP before", enemy.currentHealth);
console.log ("Weapon durability before attack:", hero.equipment.weapon?.durability);

const attackSuccess = hero.attack(enemy);

console.log("Attack success:", attackSuccess);
console.log("Enemy HP after", enemy.currentHealth);
console.log ("Weapon durability after attack:", hero.equipment.weapon?.durability);
console.log("Is enemy dead?", enemy.isDead());

hero.attack(enemy);

console.log("Attack again", attackSuccess);
console.log("Enemy HP after second attack", enemy.currentHealth);
console.log("Is enemy dead after second attack?", enemy.isDead());
console.log("Weapon durability after second attack:", hero.equipment.weapon?.durability); 