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


