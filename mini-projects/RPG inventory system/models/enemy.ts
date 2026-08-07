export class Enemy {
  constructor(
    public name: string,
    public health: number,
    public currentHealth: number,
  ) {}

  takeDamage(damage: number): boolean {
    if (damage <= 0) {
      return false;
    }
    const previousHealth = this.currentHealth;
    this.currentHealth = Math.max(this.currentHealth - damage, 0);
    return this.currentHealth !== previousHealth;
  }

  isDead(): boolean {
    return this.currentHealth <= 0;
  }
}
