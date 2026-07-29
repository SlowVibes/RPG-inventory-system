export class Character {
    constructor(
        public name: string,
        public level = 1,
        public experience = 10,
        public experienceToNextLevel = 15,
        public maxHealth = 100,
        public currentHealth = 100,
        public maxMana = 50,
        public currentMana = 50,
        public gold = 1000
    ) {}

    takeDamage(damageValue: number): void {

        if (damageValue <= 0) {
            return;
        };

        this.currentHealth = Math.max(this.currentHealth - damageValue);
    
        console.log(`${this.name} took ${damageValue} damage! Current health: ${this.currentHealth}`);
    }
    
    healCharacter(healValue: number): void {

        if (healValue <= 0) {
            return;
        }

        this.currentHealth = Math.min(this.currentHealth + healValue, this.maxHealth);

        if (this.currentHealth === this.maxHealth) {
            console.log(`${this.name} is fully healed! Current health: ${this.currentHealth}`);
            return;
        }

        console.log(`${this.name} was gained ${healValue} health points! Current health: ${this.currentHealth}`);
    }

    restoreMana(manaValue: number): void {

        if (manaValue <= 0) {
            return;
        }

        this.currentMana = Math.min(this.currentMana + manaValue, this.maxMana);

        console.log(`${this.name} restored ${manaValue} mana points! Current mana: ${this.currentMana}`);
    }

    addGold(goldValue: number): void {

        if (goldValue <= 0) {
            return;
        }

        this.gold += goldValue;

        console.log(`${this.name} gained ${goldValue} gold! Current gold: ${this.gold}`);
    }

    // Later on, will be decided to change public access modifiers to private and add getter and setter methods for better encapsulation
}

