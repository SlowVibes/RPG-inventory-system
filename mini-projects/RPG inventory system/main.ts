import { Character } from './models/character';
import { Weapon } from './models/weapon';
import { Armor } from './models/armor';
import { Ring } from './models/ring';

const hero = new Character("Conan");
const excalibur = new Weapon(1, "Excalibur", 5, 1000, 15, 100);
const barbarianArmor = new Armor(2, "Barbarian Armor", 10, 500, 20, 100);
const rubyRing = new Ring(3, "Ruby Ring", 1, 200, 5, 50);

hero.takeDamage(20);

hero.takeDamage(-90); // >> Test negative damage value

hero.healCharacter(10);

hero.healCharacter(100); // >> Test max health ceiling (fully healed status)


console.log(hero);
console.log(excalibur);
console.log(barbarianArmor);
console.log(rubyRing);