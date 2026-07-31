import { Character } from "./models/character";
import { Weapon } from "./models/weapon";
import { Armor } from "./models/armor";
import { Ring } from "./models/ring";
import { Potion } from "./models/potion";

const hero = new Character("Conan");
const excalibur = new Weapon(1, "Excalibur", 10, 1000, 15, 100);
const barbarianArmor = new Armor(2, "Barbarian Armor", 100, 500, 20, 100);
const rubyRing = new Ring(3, "Ruby Ring", 10, 200, 5, 50);
const healthPotion = new Potion(4, "Health Potion", 10, 50, 20, 0);
const manaPotion = new Potion(5, "Mana Potion", 1, 10, 0, 20);
const superPotion = new Potion(6, "Super Potion", 2, 100, 50, 50);

// Test adding a normal item
hero.pickUpItem(excalibur);
hero.pickUpItem(rubyRing);
hero.pickUpItem(healthPotion);
hero.pickUpItem(manaPotion);
hero.pickUpItem(superPotion);

// Test adding an overweighted item
hero.pickUpItem(barbarianArmor);

hero.takeDamage(20);
console.log(`Current Health: ${hero.currentHealth}`); // >> Test current health after taking damage 

hero.takeDamage(-90); // >> Test negative damage value

hero.usePotion(healthPotion);

console.log(`Current Health: ${hero.currentHealth}`); // >> Test current health after using health potion
console.log(hero.inventory.items); // >> Test inventory after using health potion

hero.addGold(500);

hero.inventory.listItems();

hero.inventory.searchItemById(1); // >> Test search for an existing item

hero.inventory.dropItem(1);

hero.inventory.searchItemById(99); // >> Test search for a non-existing item
