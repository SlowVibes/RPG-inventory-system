# Conan's Codeventures ⚔️

A small browser-based fantasy RPG built with TypeScript.

<a href="https://ibb.co/cSm5B8s4"><img src="https://i.ibb.co/1tSVgX4F/K-perny-k-p-2026-08-09-155629.png" alt="K-perny-k-p-2026-08-09-155629" border="0"></a>


The project started as an object-oriented programming exercise focused on inventory management, but gradually evolved into a playable RPG prototype featuring combat, equipment, potions, leveling, enemies, a shop, animations, and a graphical user interface.

## 🎮 Features

- Turn-based combat system
- Three different enemies:
  - Goblin
  - Magician
  - Ogre Boss
- Enemy-specific attack animations
- Fire magic attack for the Magician
- Character leveling and experience system
- Health and mana management
- Weapon durability
- Inventory with weight limit
- Equipment system
  - Weapons
  - Armor
  - Rings
- Consumable potions
  - Health Potion
  - Mana Potion
  - Super Potion
- Gold and reward system
- RPG shop with item purchasing
- Combat log
- Dynamic HP, Mana and XP bars
- Character and enemy sprite states
  - Idle
  - Attack
  - Dead
- Level-up animation
- Enemy progression with a "Next Enemy" system
- Final boss encounter
- Animated ending screen

## 🧙 Gameplay

The player controls Conan and fights enemies one after another.

Each combat round consists of:

1. Conan attacks the current enemy.
2. If the enemy survives, it attacks Conan.
3. Defeated enemies reward Conan with experience and gold.
4. Experience can trigger one or multiple level-ups.
5. After defeating an enemy, the next opponent becomes available.

The final enemy is the Ogre Boss.

Defeating the Ogre completes the game.

## 📈 Character Progression

Leveling up improves Conan's base stats and restores his resources.

The character can improve through:

- Level increases
- Better weapons
- Armor
- Strength rings
- Consumable items

Equipment dynamically affects the character's combat statistics.

## 🎒 Inventory

The inventory system supports:

- Item storage
- Weight limits
- Item lookup
- Item removal
- Equipment management
- Consumable item usage

Items that exceed the inventory's weight limit cannot be added.

## ⚔️ Equipment

Conan can equip:

- One weapon
- One armor
- One ring

Equipping a new item automatically replaces the previously equipped item and returns it to the inventory.

## 🧪 Potions

Different potions restore different resources:

| Potion | Effect |
|---|---|
| Health Potion | Restores health |
| Mana Potion | Restores mana |
| Super Potion | Restores both health and mana |

Potions are only consumed when they successfully change the character's state.

## 🛒 Shop

The shop allows Conan to purchase equipment and consumables using gold.

Purchasing an item:

- Checks whether the item exists
- Checks available inventory capacity
- Checks whether Conan has enough gold
- Removes the gold
- Moves the item into Conan's inventory
- Removes the item from the shop

The underlying game logic also supports selling items back to the shop.

## 👹 Enemies

### Goblin

The first enemy and introduction to the combat system.

### Magician

A stronger ranged enemy that attacks Conan using animated fire magic.

### Ogre Boss

The final and strongest enemy in the game.

Defeating the Ogre completes the game.

## 🧱 Project Structure

The game logic is separated from the user interface.

```text
models/
├── character.ts
├── enemy.ts
├── inventory.ts
├── equipment.ts
├── item.ts
├── weapon.ts
├── armor.ts
├── ring.ts
├── potion.ts
├── shop.ts
└── itemtype.ts

gui/
├── src/
│   ├── assets/
│   ├── main.ts
│   └── style.css
└── index.html

tests/
├── inventory.test.ts
├── character.test.ts
├── combat.test.ts
├── shop.test.ts
├── potion.test.ts
└── ...
