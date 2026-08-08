import type { Character } from "./character";

export class Enemy {
  constructor(
    public name: string,
    public health = 100,
    public currentHealth = 100,
    public attackValue = 20,
    public defense = 0,
    public experienceReward = 25,
  ) {}

  takeDamage(damage: number): boolean {
    if (damage <= 0) {
      return false;
    }
    const previousHealth = this.currentHealth;

    if (damage <= this.defense) {
      return false;
    }

    const actualDamage = damage - this.defense;

    this.currentHealth = Math.max(this.currentHealth - actualDamage, 0);
    return this.currentHealth !== previousHealth;
  }

  attack(character: Character): boolean {
    if (this.isDead() || character.isDead()) {
      return false;
    }
    return character.takeDamage(this.attackValue);
  }

  isDead(): boolean {
    return this.currentHealth <= 0;
  }
}
