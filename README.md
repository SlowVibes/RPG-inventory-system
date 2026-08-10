# ⚔️ Conan's Codeventures v.1.0.

A small browser-based fantasy RPG built with **TypeScript**.

The project originally started as an object-oriented programming exercise focused on inventory management, but gradually evolved into a fully playable RPG prototype with combat, enemies, equipment, potions, leveling, a shop, animations and a graphical user interface.

## 🎮 Play Online
<a href="https://ibb.co/zHnJmqmR"><img src="https://i.ibb.co/JFBQcDc7/f0b083ec-a7ba-435d-9fa6-8fd1796ef555.png" alt="f0b083ec-a7ba-435d-9fa6-8fd1796ef555" border="0"></a>

<a href="https://ibb.co/sd7xjscX"><img src="https://i.ibb.co/pBqV24Nk/conanscreenshot1.png" alt="conanscreenshot1" border="0"></a>
<a href="https://ibb.co/8gQwcGJg"><img src="https://i.ibb.co/qY285hzY/conanscreenshot2.png" alt="conanscreenshot2" border="0"></a>

### 👉 [PLAY CONAN'S CODEVENTURES](https://slowvibes.github.io/RPG-inventory-system/)

No installation required — play directly in your browser.

---

## 🕹️ About the Game

Take control of **Conan** and fight your way through three increasingly dangerous enemies.

```text
Goblin
   ↓
Magician
   ↓
Ogre Boss
   ↓
Victory!
```

Defeat enemies, earn experience and gold, level up, equip stronger gear and use the shop to prepare for the next fight.

Defeat the Ogre Boss to complete the game.

---

## ✨ Features

- ⚔️ Turn-based combat system
- 👹 Three unique enemies
  - Goblin
  - Magician
  - Ogre Boss
- 🔥 Enemy-specific attack animations
- 🪄 Animated fire magic attack
- 📈 Character leveling and experience system
- ❤️ Health system
- 💙 Mana system
- 💰 Gold and enemy rewards
- 🎒 Inventory with weight limit
- 🗡️ Weapon system
- 🛡️ Armor system
- 💍 Rings and stat bonuses
- 🧪 Consumable potions
- 🔨 Weapon durability
- 🛒 RPG shop
- 📜 Dynamic combat log
- ❤️ Dynamic HP bars
- 💙 Dynamic Mana bar
- ⭐ Dynamic XP bar
- ⚔️ Attack animations
- 💥 Damage animations
- ☠️ Death sprites
- ⬆️ Level-up animation
- ➡️ Enemy progression system
- 🏆 Final boss encounter
- 🎬 Animated ending screen
- 📱 Responsive interface

---

## 👹 Enemies

### Goblin

The first enemy Conan encounters.

The Goblin introduces the basic combat mechanics and provides the first opportunity to gain experience and gold.

### Magician

A stronger ranged opponent.

The Magician uses an animated **fire magic attack** against Conan.

### Ogre Boss

The final and strongest enemy.

Defeating the Ogre Boss completes Conan's journey and triggers the ending screen.

---

## ⚔️ Combat

Combat is turn-based.

Each round follows a simple sequence:

1. Conan attacks the enemy.
2. Damage is reduced by the enemy's defense.
3. If the enemy survives, it attacks Conan.
4. Conan's defense reduces incoming damage.
5. Defeated enemies reward experience and gold.
6. Conan may level up after gaining enough experience.
7. The next enemy becomes available.

Combat automatically ends when either Conan or the current enemy dies.

---

## 📈 Character Progression

Conan becomes stronger throughout the game by gaining experience.

Leveling up increases his base statistics and restores his resources.

Character strength is determined by a combination of:

- Base Attack
- Base Defense
- Base Strength
- Character Level
- Equipped Weapon
- Equipped Armor
- Equipped Ring

Equipment dynamically changes the displayed character statistics.

---

## 🎒 Inventory System

The inventory supports:

- Adding items
- Removing items
- Finding items by ID
- Using consumable items
- Equipping equipment
- Inventory weight calculation
- Maximum weight restrictions

Items cannot be added if they would exceed the inventory's weight limit.

---

## 🛡️ Equipment System

Conan can equip:

- 🗡️ One Weapon
- 🛡️ One Armor
- 💍 One Ring

When new equipment replaces an existing item, the previously equipped item is returned to the inventory.

Equipment directly affects Conan's combat statistics.

---

## 🧪 Potions

Several consumable items are available.

| Potion | Effect |
| --- | --- |
| Health Potion | Restores health |
| Mana Potion | Restores mana |
| Super Potion | Restores multiple resources |

Consumables are removed from the inventory after successful use.

---

## 🛒 Shop

The game contains a graphical RPG shop where Conan can purchase new equipment and consumables.

Before a purchase is completed, the game checks:

- Whether the item exists
- Whether Conan has enough gold
- Whether the inventory has enough capacity

Successful purchases transfer the item into Conan's inventory and deduct its price from his gold.

The underlying game logic also supports selling items back to the shop.

---

## 🧱 Architecture

The game logic is separated from the graphical user interface.

The core RPG systems are implemented as TypeScript classes.

```text
RPG-inventory-system/
│
├── models/
│   ├── character.ts
│   ├── enemy.ts
│   ├── equipment.ts
│   ├── inventory.ts
│   ├── item.ts
│   ├── itemtype.ts
│   ├── weapon.ts
│   ├── armor.ts
│   ├── ring.ts
│   ├── potion.ts
│   └── shop.ts
│
├── tests/
│
├── gui/
│   ├── src/
│   │   ├── assets/
│   │   ├── main.ts
│   │   └── style.css
│   │
│   ├── index.html
│   ├── package.json
│   └── vite.config.ts
│
└── README.md
```

This separation allows the RPG mechanics to work independently from the browser interface.

---

## 🛠️ Technologies

The project was built using:

- **TypeScript**
- **HTML**
- **CSS**
- **Vite**
- **Vitest**
- **Git**
- **GitHub Actions**
- **GitHub Pages**

No frontend framework is used.

The interface is rendered directly from TypeScript using DOM manipulation.

---

## 🧪 Testing

The core RPG systems are covered by automated tests.

The test suite covers areas such as:

- Inventory management
- Inventory weight limits
- Character health
- Damage calculation
- Defense calculation
- Equipment
- Item usage
- Potions
- Weapon durability
- Enemy combat
- Experience rewards
- Gold rewards
- Leveling
- Shop purchases
- Shop selling

Run the test suite with:

```bash
npm test
```

---

## 🚀 Running Locally

Clone the repository:

```bash
git clone https://github.com/SlowVibes/RPG-inventory-system.git
```

Enter the project:

```bash
cd RPG-inventory-system
```

Install the GUI dependencies:

```bash
cd gui
npm install
```

Start the development server:

```bash
npm run dev
```

Vite will provide a local development URL.

---

## 🧠 What I Practiced

This project was built primarily to strengthen my TypeScript and software development fundamentals.

During development I practiced:

- Object-Oriented Programming
- Classes
- Inheritance
- Composition
- Encapsulation
- Separation of responsibilities
- TypeScript types
- Enums
- Array methods
- State management
- DOM manipulation
- Event listeners
- Dynamic rendering
- CSS animations
- Unit testing
- Refactoring
- Git workflow
- Production builds
- Continuous deployment with GitHub Actions

One of the main goals was to keep the **game mechanics independent from the user interface**.

The graphical interface interacts with the model layer instead of containing the core game rules itself.

---

## 🎨 Artwork

The game uses custom fantasy-style graphical assets for:

- Conan
- Enemies
- Attack states
- Death states
- Equipment
- Potions
- Inventory
- Shop interface
- Character statistics
- Combat effects

Graphical assets were created with generative AI and prepared for use within the game.

---

## 🌐 Deployment

The game is automatically built and deployed using **GitHub Actions** and hosted with **GitHub Pages**.

### 🎮 [Play the game online](https://slowvibes.github.io/RPG-inventory-system/)

---

## 📌 Project Status

**Finished**

The main gameplay loop, character progression, enemy progression, inventory, equipment, shop, animations and final boss encounter are implemented.

A final code refactoring and testing has been finished.
---

## 👨‍💻 Author

**Gergo Stroban**

Built as a TypeScript learning and portfolio project.
