import { Character } from "./models/character";
import { Weapon } from "./models/weapon";
import { Armor } from "./models/armor";
import { Ring } from "./models/ring";
import { Potion } from "./models/potion";
import { Enemy } from "./models/enemy";
import { Shop } from "./models/shop";

const shop = new Shop([
  new Weapon(1, "Magic Sword", 5, 100, 100, 100),
  new Armor(2, "Iron Armor", 10, 150, 10, 100),
  new Ring(3, "Flawless Ring", 1, 200, 5, 10)
]);

const hero = new Character("Conan");
const enemy  = new Enemy("Goblin Apprentice", 10, 10, 5, 2, 20, 50);
const enemy_2 = new Enemy("Goblin Warrior", 20, 20, 10, 5, 40, 100);
const sword = new Weapon(1, "Sword", 5, 100, 100, 100);
const armor = new Armor(2, "Armor", 10, 150, 10, 100);
const ring = new Ring(3, "Strength Ring", 1, 200, 5, 10);

hero.pickUpItem(sword);
hero.pickUpItem(armor);
hero.pickUpItem(ring);

hero.equipItem(sword.id);
hero.equipItem(armor.id);
hero.equipItem(ring.id);

console.log("Enemy HP before", enemy.currentHealth);
console.log("Hero gold before attack", hero.gold);
console.log ("Weapon durability before attack:", hero.equipment.weapon?.durability);

const attackSuccess = hero.attack(enemy);

console.log("Attack success:", attackSuccess);
console.log("Enemy HP after", enemy.currentHealth);
console.log("Hero HP after attack", hero.currentHealth);
console.log ("Weapon durability after attack:", hero.equipment.weapon?.durability);
console.log("Is enemy dead?", enemy.isDead());

enemy.attack(hero);
console.log("Hero HP after Goblin Apprentice attack", hero.currentHealth);
enemy_2.attack(hero);
console.log("Hero HP after Goblin Warrior attack", hero.currentHealth);

hero.attack(enemy);

console.log("Hero experience after gaining XP:", hero.experience);
console.log("Hero level after gaining XP:", hero.level);
console.log("Hero experience to next level:", hero.experienceToNextLevel);
console.log("Attack again", attackSuccess);
console.log("Enemy HP after second attack", enemy.currentHealth);
console.log("Is enemy dead after second attack?", enemy.isDead());
console.log("Weapon durability after second attack:", hero.equipment.weapon?.durability); 

console.log("Is enemy dead?", enemy.attack(hero));

enemy_2.attack(hero);
console.log("Hero HP after Goblin Warrior attack", hero.currentHealth);

console.log("Hero can attack?", hero.attack(enemy_2));

console.log("Goblin Warrior can attack?", enemy_2.attack(hero));

console.log ("Hero gold after defeating enemies:", hero.gold);

console.log("Gold before:", hero.gold);
console.log("Shop item before:", shop.getItemById(1));

console.log("Buy result:", shop.buyItem(1, hero));

console.log("Gold after:", hero.gold);
console.log("Inventory item:", hero.inventory.getItemById(1));
console.log("Shop item after:", shop.getItemById(1));

console.log("Gold before sell:", hero.gold);
console.log("Inventory before:", hero.inventory.getItemById(1));

console.log("Sell result:", shop.sellItem(1, hero));

console.log("Gold after sell:", hero.gold);
console.log("Inventory after:", hero.inventory.getItemById(1));
console.log("Shop after:", shop.getItemById(1));