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

// Test adding items to the inventory and check if they were added successfully
const addedExcalibur = hero.inventory.addItem(excalibur);
console.log("Added Excalibur:", addedExcalibur);

// Test adding items to the inventory and check if they were added successfully
const addedBarbarianArmor = hero.inventory.addItem(barbarianArmor);
console.log("Added Barbarian Armor:", addedBarbarianArmor);

hero.takeDamage(20);

hero.takeDamage(-90); // >> Test negative damage value

hero.healCharacter(10);

hero.healCharacter(100); // >> Test max health ceiling (fully healed status)

hero.addGold(500);


hero.inventory.listItems();

const existingItem = hero.inventory.searchItemById(1); // >> Test search for an existing item
console.log("Existing item:", existingItem);

const listItems = hero.inventory.listItems();
console.log("List of items in inventory:", listItems);

const firstDroppedItem = hero.inventory.dropItem(1);
console.log("First dropped item:", firstDroppedItem);

hero.inventory.listItems();

const secondDroppedItem = hero.inventory.dropItem(1);
console.log("Second dropped item:", secondDroppedItem);

const nonExistingItem = hero.inventory.searchItemById(99); // >> Test search for a non-existing item
console.log("Non-existing item:", nonExistingItem);

