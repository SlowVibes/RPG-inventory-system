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


    // Mana method, AddGold method, etc. can be added here as needed
}

