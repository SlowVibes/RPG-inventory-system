import { Character } from "./models/character";
import { Weapon } from "./models/weapon";
import { Armor } from "./models/armor";
import { Ring } from "./models/ring";
import { Potion } from "./models/potion";

const hero = new Character("Conan");
const excalibur = new Weapon(1, "Excalibur", 5, 1000, 15, 100);
const barbarianArmor = new Armor(2, "Barbarian Armor", 60, 500, 20, 100);
const rubyRing = new Ring(3, "Ruby Ring", 1, 200, 5, 50);
const healthPotion = new Potion(4, "Health Potion", 1, 50, 20, 0);
const manaPotion = new Potion(5, "Mana Potion", 1, 50, 0, 20);
const superPotion = new Potion(6, "Super Potion", 2, 100, 50, 50);

hero.takeDamage(20);

hero.takeDamage(-90); // >> Test negative damage value

hero.healCharacter(10);

hero.healCharacter(100); // >> Test max health ceiling (fully healed status)

hero.addGold(500);

hero.inventory.addItem(excalibur);
hero.inventory.addItem(barbarianArmor);
hero.inventory.addItem(rubyRing);
hero.inventory.addItem(healthPotion);
hero.inventory.addItem(manaPotion);
hero.inventory.addItem(superPotion);

hero.inventory.listItems();

hero.inventory.dropItem(2);
hero.inventory.dropItem(3);

hero.inventory.listItems();



console.log(hero);
console.log(excalibur);
console.log(barbarianArmor);
console.log(rubyRing);
console.log(healthPotion);
console.log(manaPotion);
console.log(superPotion);
console.log(hero.gold);

hero.inventory.searchItemById(2); // >> Test search for an existing item
hero.inventory.searchItemById(99); // >> Test search for a non-existing item