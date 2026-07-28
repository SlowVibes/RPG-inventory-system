import { Character } from './models/character';

const hero = new Character("Conan");

console.log(hero);

hero.takeDamage(20);

// >> Test negative damage value
hero.takeDamage(-90);

hero.healCharacter(10);

// >> Test max health ceiling (fully healed status)
hero.healCharacter(100);