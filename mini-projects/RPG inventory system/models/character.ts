import { Inventory } from "./inventory";
import { Item } from "./item";
import { Equipment } from "./equipment";

export class Character {
  inventory: Inventory;
  public equipment: Equipment;
  constructor(
    public name: string,
    public level = 1,
    public experience = 10,
    public experienceToNextLevel = 15,
    public maxHealth = 100,
    public currentHealth = 100,
    public maxMana = 50,
    public currentMana = 50,
    public gold = 1000,
  ) {
    this.inventory = new Inventory();
    this.equipment = new Equipment();
  }

  takeDamage(damageValue: number): void {
    if (damageValue <= 0) {
      return;
    }

    this.currentHealth = Math.max(this.currentHealth - damageValue, 0);
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
}
