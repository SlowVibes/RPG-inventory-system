import { Character } from "./models/character";
import { Weapon } from "./models/weapon";
import { Armor } from "./models/armor";
import { Ring } from "./models/ring";
import { Potion } from "./models/potion";

const hero = new Character("Conan");
const potion = new Potion(1, "Health Potion", 0.5, 50, 30, 0);
hero.pickUpItem(potion);

hero.takeDamage(50);

console.log(hero.currentHealth);

hero.useItem(1);

console.log(hero.currentHealth);

console.log(hero.inventory.items);
