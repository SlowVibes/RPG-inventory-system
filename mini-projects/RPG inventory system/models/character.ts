import { Inventory } from "./inventory";
import { Item } from "./item";
import { Equipment } from "./equipment";
import type { Enemy } from "./enemy";

export class Character {
  inventory: Inventory;
  public equipment: Equipment;
  constructor(
    public name: string,
    public characterClass = "Barbarian",
    public level = 1,
    public experience = 10,
    public experienceToNextLevel = 15,
    public maxHealth = 100,
    public currentHealth = 100,
    public maxMana = 50,
    public currentMana = 50,
    public gold = 1000,
    public baseAttack = 5,
    public baseDefense = 0,
    public baseStrength = 5,
  ) {
    this.inventory = new Inventory();
    this.equipment = new Equipment();
  }

  takeDamage(damageValue: number): boolean {
    if (damageValue <= 0) {
      return false;
    }

    const actualDamage = Math.max(damageValue - this.getDefense(), 0);

    if (actualDamage === 0) {
      return false;
    }
    const previousHealth = this.currentHealth;

    this.currentHealth = Math.max(this.currentHealth - actualDamage, 0);

    return this.currentHealth !== previousHealth;
  }

  healCharacter(healValue: number): boolean {
    if (healValue <= 0) {
      return false;
    }

    const previousHealth = this.currentHealth;

    this.currentHealth = Math.min(
      this.currentHealth + healValue,
      this.maxHealth,
    );

    return this.currentHealth !== previousHealth;
  }

  restoreMana(manaValue: number): boolean {
    if (manaValue <= 0) {
      return false;
    }

    const previousMana = this.currentMana;
    this.currentMana = Math.min(this.currentMana + manaValue, this.maxMana);
    return this.currentMana !== previousMana;
  }

  addGold(goldValue: number): boolean {
    if (goldValue <= 0) {
      return false;
    }

    this.gold += goldValue;
    return true;
  }

  spendGold(goldValue: number): boolean {
    if (goldValue <= 0 || goldValue > this.gold) {
      return false;
    }

    this.gold -= goldValue;
    return true;
  }

  pickUpItem(item: Item): boolean {
    return this.inventory.addItem(item);
  }

  removeItem(id: number): boolean {
    return this.inventory.removeItem(id);
  }

  useItem(itemId: number): boolean {
    const item = this.inventory.getItemById(itemId);

    if (!item) {
      return false;
    }

    const usedSuccessfully = item.use(this);

    if (!usedSuccessfully) {
      return false;
    }

    return this.inventory.removeItem(itemId);
  }

  equipItem(id: number): boolean {
    const item = this.inventory.getItemById(id);

    if (!item) {
      return false;
    }

    const result = this.equipment.equip(item);

    if (!result.equipped) {
      return false;
    }

    if (result.previousItem) {
      this.inventory.addItem(result.previousItem);
    }

    return this.inventory.removeItem(id);
  }

  getAttack(): number {
    const weaponDamage = this.equipment.weapon?.damage ?? 0;

    return this.baseAttack + weaponDamage;
  }

  getDefense(): number {
    const armorDefense = this.equipment.armor?.defense ?? 0;
    return this.baseDefense + armorDefense;
  }

  getStrength(): number {
    const ringStrength = this.equipment.ring?.bonusStrength ?? 0;
    return this.baseStrength + ringStrength;
  }

  attack(enemy: Enemy): boolean {
    if (this.isDead() || enemy.isDead()) {
      return false;
    }

    const weapon = this.equipment.weapon;

    if (!weapon) {
      return false;
    }

    const damage = weapon.attack();

    if (damage <= 0) {
      return false;
    }

    const damaged = enemy.takeDamage(damage);

    if (!damaged) {
      return false;
    }

    if (enemy.isDead()) {
      this.gainExperience(enemy.experienceReward);
      this.addGold(enemy.goldReward);
    }

    return true;
  }

  isDead(): boolean {
    return this.currentHealth <= 0;
  }

  gainExperience(xp: number): boolean {
    if (xp <= 0) {
      return false;
    }
    this.experience += xp;

    while (this.experience >= this.experienceToNextLevel) {
      this.levelUp();
    }

    return true;
  }

  private levelUp(): void {
    const requiredExperience = this.experienceToNextLevel;

    this.experience -= requiredExperience;
    this.experienceToNextLevel = Math.floor(this.experienceToNextLevel * 1.5);
    this.level++;

    this.maxHealth += 10;
    this.currentHealth = this.maxHealth;
    this.maxMana += 5;
    this.currentMana = this.maxMana;
    this.baseAttack += 2;
    this.baseDefense += 1;
    this.baseStrength += 1;
  }
}
