import "./style.css";

import { Character } from "../../models/character";
import { Enemy } from "../../models/enemy";
import { Weapon } from "../../models/weapon";
import { Armor } from "../../models/armor";
import { Ring } from "../../models/ring";
import { Potion } from "../../models/potion";
import { ItemType } from "../../models/itemtype";

const hero = new Character("Conan");

const enemy = new Enemy(
  "Goblin",
  60,
  60,
  10,
  5,
  20,
  20,
);

const axe = new Weapon(
  1,
  "Axe",
  5,
  500,
  15,
  100,
);

const supremeAxe = new Weapon(
  2,
  "Supreme Axe",
  5,
  1000,
  30,
  250,
);

const potion = new Potion(
  3,
  "Health Potion",
  0.25,
  25,
  30,
  0,
);

const armor = new Armor(
  4,
  "Iron Armor",
  10,
  300,
  10,
  100,
);

const ring = new Ring(
  5,
  "Strength Ring",
  0.1,
  250,
  5,
  10,
);

hero.pickUpItem(potion);
hero.pickUpItem(axe);
hero.pickUpItem(supremeAxe);
hero.pickUpItem(armor);
hero.pickUpItem(ring);

hero.equipItem(axe.id);

const combatLog: string[] = [];

let activePanel: "inventory" | "equipment" = "inventory";
let gameOverLogged = false;

function render(): void {
  const heroHealthPercentage =
    (hero.currentHealth / hero.maxHealth) * 100;

  const heroManaPercentage =
    (hero.currentMana / hero.maxMana) * 100;

  const heroXpPercentage =
    (hero.experience / hero.experienceToNextLevel) * 100;

  const enemyHealthPercentage =
    (enemy.currentHealth / enemy.maxHealth) * 100;

  const combatLogHtml = combatLog
    .slice(0, 8)
    .map((message) => `<p>${message}</p>`)
    .join("");

  const inventoryHtml = hero.inventory.items
    .map((item) => {
      const buttonText =
        item.type === ItemType.Potion
          ? "Use"
          : "Equip";

      return `
        <div class="inventory-item">
          <div class="item-details">
            <strong>${item.name}</strong>
            <span>${item.weight} kg</span>
          </div>

          <button
            class="item-button"
            data-item-id="${item.id}"
          >
            ${buttonText}
          </button>
        </div>
      `;
    })
    .join("");

  const equipmentHtml = `
    <div class="equipment-item">
      <span>Weapon</span>
      <strong>
        ${hero.equipment.weapon?.name ?? "Empty"}
      </strong>
    </div>

    <div class="equipment-item">
      <span>Armor</span>
      <strong>
        ${hero.equipment.armor?.name ?? "Empty"}
      </strong>
    </div>

    <div class="equipment-item">
      <span>Ring</span>
      <strong>
        ${hero.equipment.ring?.name ?? "Empty"}
      </strong>
    </div>
  `;

  const activePanelHtml =
    activePanel === "inventory"
      ? `
        <section class="hero-panel">
          <h2>Inventory</h2>

          ${
            inventoryHtml ||
            "<p class='empty-message'>Inventory is empty.</p>"
          }
        </section>
      `
      : `
        <section class="hero-panel">
          <h2>Equipment</h2>

          ${equipmentHtml}
        </section>
      `;

  document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
    <main class="game">

      <h1 class="main-game-title">
        Conan's Codeventures
      </h1>

      <section class="battle-layout">

        <!-- HERO -->

        <section class="character-card">

          <h2 class="character-name">
            ${hero.name}
            ${hero.isDead() ? "☠️" : ""}
          </h2>

          <div class="sprite-container">
            <img
              id="hero-sprite"
              class="character-sprite"
              src="src/assets/conan.png"
              alt="Conan"
            />
          </div>

          <div class="stats">

            <div class="stat-row">
              <span>Level</span>
              <strong>${hero.level}</strong>
            </div>

            <div class="stat-label">
              <span>HP</span>
              <span>
                ${hero.currentHealth} / ${hero.maxHealth}
              </span>
            </div>

            <div class="bar">
              <div
                class="health-fill"
                style="width: ${heroHealthPercentage}%"
              ></div>
            </div>

            <div class="stat-label">
              <span>Mana</span>
              <span>
                ${hero.currentMana} / ${hero.maxMana}
              </span>
            </div>

            <div class="bar">
              <div
                class="mana-fill"
                style="width: ${heroManaPercentage}%"
              ></div>
            </div>

            <div class="stat-label">
              <span>XP</span>
              <span>
                ${hero.experience}
                /
                ${hero.experienceToNextLevel}
              </span>
            </div>

            <div class="bar">
              <div
                class="xp-fill"
                style="width: ${heroXpPercentage}%"
              ></div>
            </div>

            <div class="stat-row">
              <span>Gold</span>
              <strong>${hero.gold}</strong>
            </div>

            <div class="stat-row">
              <span>Attack</span>
              <strong>${hero.getAttack()}</strong>
            </div>

            <div class="stat-row">
              <span>Defense</span>
              <strong>${hero.getDefense()}</strong>
            </div>

            <div class="stat-row">
              <span>Strength</span>
              <strong>${hero.getStrength()}</strong>
            </div>

          </div>

        </section>

        <!-- CENTER -->

        <section class="center-column">

          <section class="combat-log-card">

            <h2>Combat Log</h2>

            <div class="combat-log">
              ${
                combatLogHtml ||
                "<p>No combat yet.</p>"
              }
            </div>

          </section>

          <button
            id="attack-button"
            class="attack-button"
            ${
              enemy.isDead() || hero.isDead()
                ? "disabled"
                : ""
            }
          >
            ⚔ Attack
          </button>

        </section>

        <!-- ENEMY -->

        <section class="enemy-card">

          <h2 class="character-name">
            ${enemy.name}
            ${enemy.isDead() ? "☠️" : ""}
          </h2>

          <div class="sprite-container">
            <img
              id="enemy-sprite"
              class="character-sprite"
              src="src/assets/goblin.png"
              alt="Goblin"
            />
          </div>

          <div class="stats">

            <div class="stat-label">
              <span>HP</span>
              <span>
                ${enemy.currentHealth}
                /
                ${enemy.maxHealth}
              </span>
            </div>

            <div class="bar">
              <div
                class="enemy-health-fill"
                style="width: ${enemyHealthPercentage}%"
              ></div>
            </div>

            <div class="stat-row">
              <span>Attack</span>
              <strong>${enemy.attackValue}</strong>
            </div>

            <div class="stat-row">
              <span>Defense</span>
              <strong>${enemy.defense}</strong>
            </div>

            <div class="stat-row">
              <span>XP Reward</span>
              <strong>${enemy.experienceReward}</strong>
            </div>

            <div class="stat-row">
              <span>Gold Reward</span>
              <strong>${enemy.goldReward}</strong>
            </div>

          </div>

        </section>

      </section>

      <!-- LOWER CONTROLS -->

      <section class="lower-layout">

        <section class="hero-controls">

          <div class="panel-buttons">

            <button
              id="inventory-toggle"
              class="${
                activePanel === "inventory"
                  ? "active"
                  : ""
              }"
            >
              Inventory
            </button>

            <button
              id="equipment-toggle"
              class="${
                activePanel === "equipment"
                  ? "active"
                  : ""
              }"
            >
              Equipment
            </button>

          </div>

          ${activePanelHtml}

        </section>

      </section>

    </main>
  `;

  setupAttackButton();
  setupPanelButtons();
  setupItemButtons();
}

function setupAttackButton(): void {
  const attackButton =
    document.querySelector<HTMLButtonElement>(
      "#attack-button",
    );

  attackButton?.addEventListener(
    "click",
    async () => {
      const enemyHpBefore = enemy.currentHealth;
      const heroHpBefore = hero.currentHealth;

      const heroSprite =
        document.querySelector<HTMLImageElement>(
          "#hero-sprite",
        );

      const enemySprite =
        document.querySelector<HTMLImageElement>(
          "#enemy-sprite",
        );

      heroSprite?.classList.add("hero-attacking");

      await wait(180);

      const heroAttacked =
        hero.attack(enemy);

      if (heroAttacked) {
        const damageDealt =
          enemyHpBefore -
          enemy.currentHealth;

        combatLog.unshift(
          `${hero.name} dealt ${damageDealt} damage to ${enemy.name}.`,
        );

        enemySprite?.classList.add(
          "taking-damage",
        );
      }

      await wait(180);

      heroSprite?.classList.remove(
        "hero-attacking",
      );

      enemySprite?.classList.remove(
        "taking-damage",
      );

      if (enemy.isDead()) {
        combatLog.unshift(
          `${enemy.name} died! ${hero.name} gained ${enemy.experienceReward} XP and ${enemy.goldReward} gold.`,
        );

        render();
        return;
      }

      enemySprite?.classList.add(
        "enemy-attacking",
      );

      await wait(180);

      const enemyAttacked =
        enemy.attack(hero);

      if (enemyAttacked) {
        const damageDealt =
          heroHpBefore -
          hero.currentHealth;

        combatLog.unshift(
          `${enemy.name} dealt ${damageDealt} damage to ${hero.name}.`,
        );

        heroSprite?.classList.add(
          "taking-damage",
        );
      }

      await wait(180);

      enemySprite?.classList.remove(
        "enemy-attacking",
      );

      heroSprite?.classList.remove(
        "taking-damage",
      );

      if (
        hero.isDead() &&
        !gameOverLogged
      ) {
        combatLog.unshift(
          `${hero.name} died! Game Over.`,
        );

        gameOverLogged = true;
      }

      render();
    },
  );
}

function setupPanelButtons(): void {
  const inventoryToggle =
    document.querySelector<HTMLButtonElement>(
      "#inventory-toggle",
    );

  const equipmentToggle =
    document.querySelector<HTMLButtonElement>(
      "#equipment-toggle",
    );

  inventoryToggle?.addEventListener(
    "click",
    () => {
      activePanel = "inventory";
      render();
    },
  );

  equipmentToggle?.addEventListener(
    "click",
    () => {
      activePanel = "equipment";
      render();
    },
  );
}

function setupItemButtons(): void {
  const itemButtons =
    document.querySelectorAll<HTMLButtonElement>(
      ".item-button",
    );

  itemButtons.forEach((button) => {
    button.addEventListener(
      "click",
      () => {
        const itemId = Number(
          button.dataset.itemId,
        );

        const item =
          hero.inventory.getItemById(
            itemId,
          );

        if (!item) {
          return;
        }

        if (
          item.type === ItemType.Potion
        ) {
          hero.useItem(itemId);
        } else {
          hero.equipItem(itemId);
        }

        render();
      },
    );
  });
}

function wait(milliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

render();