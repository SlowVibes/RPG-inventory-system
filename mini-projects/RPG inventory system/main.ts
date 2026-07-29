import { Character } from './models/character';
import { Weapon } from './models/weapon';

const hero = new Character("Conan");

console.log(hero);

hero.takeDamage(20);

hero.takeDamage(-90); // >> Test negative damage value

hero.healCharacter(10);

hero.healCharacter(100); // >> Test max health ceiling (fully healed status)

const excalibur = new Weapon(1, "Excalibur", 5, 1000, 15, 100);

console.log(excalibur);

hero.currentHealth = 50; // Set current health to 50 for testing

console.log(hero.currentHealth); // >> Should print 50