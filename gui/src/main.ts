import "./style.css";

import { Character } from "../../models/character";
import { Enemy } from "../../models/enemy";
import { Weapon } from "../../models/weapon";
import { Armor } from "../../models/armor";
import { Ring } from "../../models/ring";
import { Potion } from "../../models/potion";
import { Shop } from "../../models/shop";
import { ItemType } from "../../models/itemtype";

import type { Item } from "../../models/item";

/* =========================
   CHARACTER ASSETS
========================= */

import conanSprite from "./assets/conan.png";
import conanAttackSprite from "./assets/conanattack.png";

/* =========================
   ENEMY ASSETS
========================= */

import goblinSprite from "./assets/goblin.png";
import goblinAttackSprite from "./assets/goblinattack.png";
import goblinDeadSprite from "./assets/goblindead.png";

import magicianSprite from "./assets/magician.png";
import magicianAttackSprite from "./assets/magicianattack.png";
import magicianDeadSprite from "./assets/magiciandead.png";

import ogreSprite from "./assets/ogre.png";
import ogreAttackSprite from "./assets/ogreattack.png";
import ogreDeadSprite from "./assets/ogredead.png";

import fireMagicSprite from "./assets/icons/firemagic.png";

/* =========================
   PANEL ASSETS
========================= */

import inventoryBackground from "./assets/inventory.png";
import equipmentBackground from "./assets/equipment.png";
import shopBackground from "./assets/shop.png";

/* =========================
   ICONS
========================= */

import goldIcon from "./assets/icons/gold.png";
import xpIcon from "./assets/icons/xp.png";

import basicAxeIcon from "./assets/icons/basicaxe.png";
import battleAxeIcon from "./assets/icons/battleaxe.png";

import armorIcon from "./assets/icons/leatherarmor.png";
import strengthIcon from "./assets/icons/strengthring.png";

import healthPotionIcon from "./assets/icons/healthpotion.png";
import manaPotionIcon from "./assets/icons/manapotion.png";
import superPotionIcon from "./assets/icons/superpotion.png";

import levelUpIcon from "./assets/icons/levelup.png";

/* =========================
   HERO
========================= */

const hero = new Character("Conan");

/* =========================
   ENEMIES
========================= */

const enemies = [
  new Enemy("Goblin", 60, 60, 10, 5, 20, 200),

  new Enemy("Magician", 90, 90, 16, 4, 35, 400),

  new Enemy("Ogre Boss", 180, 180, 26, 12, 80, 10000),
];

let enemyIndex = 0;
let enemy = enemies[enemyIndex];

/* =========================
   STARTING ITEMS
========================= */

const axe = new Weapon(1, "Axe", 5, 500, 15, 100);

const healthPotion = new Potion(3, "Health Potion", 0.25, 25, 30, 0);


hero.pickUpItem(healthPotion);
hero.pickUpItem(axe);

hero.equipItem(axe.id);

/* =========================
   SHOP
========================= */

const shop = new Shop([
  new Weapon(102, "Supreme Axe", 5, 1000, 30, 250),

  new Potion(103, "Health Potion", 0.25, 25, 30, 0),

  new Potion(104, "Mana Potion", 0.25, 25, 0, 25),

  new Potion(105, "Super Potion", 0.4, 50, 25, 25),

  new Armor(106, "Iron Armor", 10, 300, 10, 100),

  new Ring(107, "Strength Ring", 0.1, 250, 5, 10),
]);

/* =========================
   UI STATE
========================= */

const combatLog: string[] = [];

let activePanel: "inventory" | "equipment" | "shop" = "inventory";

let gameOverLogged = false;

/* =========================
   ENEMY SPRITE HELPERS
========================= */

function getEnemySprite(): string {
  if (enemy.name === "Goblin") {
    return enemy.isDead() ? goblinDeadSprite : goblinSprite;
  }

  if (enemy.name === "Magician") {
    return enemy.isDead() ? magicianDeadSprite : magicianSprite;
  }

  return enemy.isDead() ? ogreDeadSprite : ogreSprite;
}

function getEnemyAttackSprite(): string {
  if (enemy.name === "Goblin") {
    return goblinAttackSprite;
  }

  if (enemy.name === "Magician") {
    return magicianAttackSprite;
  }

  return ogreAttackSprite;
}

/* =========================
   RENDER
========================= */

function render(): void {
  const heroHealthPercentage = (hero.currentHealth / hero.maxHealth) * 100;

  const heroManaPercentage = (hero.currentMana / hero.maxMana) * 100;

  const heroXpPercentage = (hero.experience / hero.experienceToNextLevel) * 100;

  const enemyHealthPercentage = (enemy.currentHealth / enemy.maxHealth) * 100;

  /* =========================
     COMBAT LOG
  ========================= */

  const combatLogHtml = combatLog
    .slice(0, 8)
    .map((message) => `<p>${message}</p>`)
    .join("");

  /* =========================
     INVENTORY
  ========================= */

  const inventoryHtml = hero.inventory.items
    .map((item) => {
      const buttonText = item.type === ItemType.Potion ? "Use" : "Equip";

      return `
          <div class="inventory-item">

            <img
              class="item-icon"
              src="${getItemIcon(item)}"
              alt="${item.name}"
            />

            <div class="item-details">
              <strong>${item.name}</strong>

              <span>
                ${item.weight} kg
              </span>

              <span>
                Value: ${item.value}
              </span>
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

  /* =========================
     EQUIPMENT
  ========================= */

  const equipmentHtml = `
    <div class="equipment-item">

      ${
        hero.equipment.weapon
          ? `
            <img
              class="item-icon"
              src="${getItemIcon(hero.equipment.weapon)}"
              alt="Weapon"
            />
          `
          : ""
      }

      <span>Weapon</span>

      <strong>
        ${hero.equipment.weapon?.name ?? "Empty"}
      </strong>

    </div>

    <div class="equipment-item">

      ${
        hero.equipment.armor
          ? `
            <img
              class="item-icon"
              src="${getItemIcon(hero.equipment.armor)}"
              alt="Armor"
            />
          `
          : ""
      }

      <span>Armor</span>

      <strong>
        ${hero.equipment.armor?.name ?? "Empty"}
      </strong>

    </div>

    <div class="equipment-item">

      ${
        hero.equipment.ring
          ? `
            <img
              class="item-icon"
              src="${getItemIcon(hero.equipment.ring)}"
              alt="Ring"
            />
          `
          : ""
      }

      <span>Ring</span>

      <strong>
        ${hero.equipment.ring?.name ?? "Empty"}
      </strong>

    </div>
  `;

  /* =========================
     SHOP
  ========================= */

  const shopHtml = shop.items
    .map((item) => {
      return `
          <div class="shop-item">

            <img
              class="shop-item-icon"
              src="${getItemIcon(item)}"
              alt="${item.name}"
            />

            <div class="shop-item-details">

              <strong>
                ${item.name}
              </strong>

              <span>
                ${item.weight} kg
              </span>

            </div>

            <div class="shop-price">

              <img
                src="${goldIcon}"
                alt="Gold"
              />

              <strong>
                ${item.value}
              </strong>

            </div>

            <button
              class="buy-button"
              data-item-id="${item.id}"
              ${hero.gold < item.value ? "disabled" : ""}
            >
              Buy
            </button>

          </div>
        `;
    })
    .join("");

  /* =========================
     ACTIVE PANEL
  ========================= */

  let activePanelHtml = "";

  switch (activePanel) {
    case "inventory":
      activePanelHtml = `
        <section
          class="hero-panel inventory-panel"
          style="
            --panel-bg:
            url('${inventoryBackground}')
          "
        >

          <div class="panel-content">

            ${
              inventoryHtml ||
              `
                <p class="empty-message">
                  Inventory is empty.
                </p>
              `
            }

          </div>

        </section>
      `;

      break;

    case "equipment":
      activePanelHtml = `
        <section
          class="hero-panel equipment-panel"
          style="
            --panel-bg:
            url('${equipmentBackground}')
          "
        >

          <div class="panel-content equipment-content">

            ${equipmentHtml}

          </div>

        </section>
      `;

      break;

    case "shop":
      activePanelHtml = `
        <section
          class="hero-panel shop-panel"
          style="
            --panel-bg:
            url('${shopBackground}')
          "
        >

          <div class="shop-content">

            ${
              shopHtml ||
              `
                <p class="empty-message">
                  Sold out!
                </p>
              `
            }

          </div>

        </section>
      `;

      break;
  }

  /* =========================
     MAIN HTML
  ========================= */

  document.querySelector<HTMLDivElement>(
  "#app",
)!.innerHTML = `
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
            src="${conanSprite}"
            alt="Conan"
          />

          <img
            id="level-up"
            class="level-up"
            src="${levelUpIcon}"
            alt="Level Up"
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

            <span class="stat-name">
              <img
                class="stat-icon"
                src="${goldIcon}"
                alt="Gold"
              />
              Gold
            </span>

            <strong>${hero.gold}</strong>

          </div>

          <div class="stat-row">

            <span class="stat-name">
              <img
                class="stat-icon"
                src="${basicAxeIcon}"
                alt="Attack"
              />
              Attack
            </span>

            <strong>${hero.getAttack()}</strong>

          </div>

          <div class="stat-row">

            <span class="stat-name">
              <img
                class="stat-icon"
                src="${armorIcon}"
                alt="Defense"
              />
              Defense
            </span>

            <strong>${hero.getDefense()}</strong>

          </div>

          <div class="stat-row">

            <span class="stat-name">
              <img
                class="stat-icon"
                src="${strengthIcon}"
                alt="Strength"
              />
              Strength
            </span>

            <strong>${hero.getStrength()}</strong>

          </div>

        </div>

      </section>

      <!-- CENTER -->

      <section class="center-column">

        <section class="combat-log-card">

          <h2>
            Combat Log
          </h2>

          <div class="combat-log">

            ${
              combatLogHtml ||
              `<p>No combat yet.</p>`
            }

          </div>

        </section>

        <button
          id="attack-button"
          class="attack-button"
          ${
            enemy.isDead() ||
            hero.isDead()
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

        <div
          class="
            sprite-container
            enemy-sprite-container
          "
        >

          <img
            id="enemy-sprite"

            class="
              character-sprite
              ${
                enemy.isDead()
                  ? "dead-sprite"
                  : ""
              }
            "

            src="${getEnemySprite()}"

            alt="${enemy.name}"
          />

          ${
            enemy.name === "Magician" &&
            !enemy.isDead()
              ? `
                <img
                  id="fire-magic"
                  class="fire-magic"
                  src="${fireMagicSprite}"
                  alt="Fire Magic"
                />
              `
              : ""
          }

        </div>

        ${
          enemy.isDead()
            ? `
              <button
                id="next-enemy-button"
                class="next-enemy-button"

                ${
                  enemyIndex >=
                  enemies.length - 1
                    ? "disabled"
                    : ""
                }
              >
                ${
                  enemyIndex >=
                  enemies.length - 1
                    ? "All Enemies Defeated"
                    : "Next Enemy →"
                }
              </button>
            `
            : ""
        }

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

            <span class="stat-name">

              <img
                class="stat-icon"
                src="${basicAxeIcon}"
                alt="Attack"
              />

              Attack

            </span>

            <strong>
              ${enemy.attackValue}
            </strong>

          </div>

          <div class="stat-row">

            <span class="stat-name">

              <img
                class="stat-icon"
                src="${armorIcon}"
                alt="Defense"
              />

              Defense

            </span>

            <strong>
              ${enemy.defense}
            </strong>

          </div>

          <div class="stat-row">

            <span class="stat-name">

              <img
                class="stat-icon"
                src="${xpIcon}"
                alt="XP"
              />

              XP Reward

            </span>

            <strong>
              ${enemy.experienceReward}
            </strong>

          </div>

          <div class="stat-row">

            <span class="stat-name">

              <img
                class="stat-icon"
                src="${goldIcon}"
                alt="Gold"
              />

              Gold Reward

            </span>

            <strong>
              ${enemy.goldReward}
            </strong>

          </div>

        </div>

      </section>

    </section>

    <!-- LOWER PANEL -->

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

          <button
            id="shop-toggle"
            class="${
              activePanel === "shop"
                ? "active"
                : ""
            }"
          >
            Shop
          </button>

        </div>

        ${activePanelHtml}

      </section>

    </section>

    <!-- END SCREEN -->

    ${
      enemyIndex === enemies.length - 1 &&
      enemy.isDead()
        ? `
          <div class="end-screen">

            <div class="end-screen-content">

              <h2>
                Thanks for playing!
              </h2>

              <p class="end-created">
                Created by
              </p>

              <p class="end-author">
                Gergo Stroban
              </p>

            </div>

          </div>
        `
        : ""
    }

  </main>
  `;

  setupAttackButton();
  setupPanelButtons();
  setupItemButtons();
  setupShopButtons();
  setupNextEnemyButton();
}

/* =========================
   ATTACK
========================= */

function setupAttackButton(): void {
  const attackButton =
    document.querySelector<HTMLButtonElement>("#attack-button");

  attackButton?.addEventListener("click", async () => {
    const enemyHpBefore = enemy.currentHealth;

    const heroHpBefore = hero.currentHealth;

    const levelBefore = hero.level;

    const heroSprite = document.querySelector<HTMLImageElement>("#hero-sprite");

    const enemySprite =
      document.querySelector<HTMLImageElement>("#enemy-sprite");

    /* =====================
         HERO ATTACK
      ====================== */

    if (heroSprite) {
      heroSprite.src = conanAttackSprite;
    }

    heroSprite?.classList.add("hero-attacking");

    await wait(180);

    const heroAttacked = hero.attack(enemy);

    const leveledUp = hero.level > levelBefore;

    if (heroAttacked) {
      const damageDealt = enemyHpBefore - enemy.currentHealth;

      combatLog.unshift(
        `${hero.name} dealt ${damageDealt} damage to ${enemy.name}.`,
      );

      enemySprite?.classList.add("taking-damage");
    }

    await wait(180);

    heroSprite?.classList.remove("hero-attacking");

    if (heroSprite) {
      heroSprite.src = conanSprite;
    }

    enemySprite?.classList.remove("taking-damage");

    /* =====================
         ENEMY DIED
      ====================== */

    if (enemy.isDead()) {
      combatLog.unshift(
        `${enemy.name} died! ${hero.name} gained ${enemy.experienceReward} XP and ${enemy.goldReward} gold.`,
      );

      render();

      if (leveledUp) {
        const levelUpImage =
          document.querySelector<HTMLImageElement>("#level-up");

        levelUpImage?.classList.add("show");
      }

      return;
    }

    /* =====================
         MAGICIAN ATTACK
      ====================== */

    if (enemy.name === "Magician") {
      const fireMagic = document.querySelector<HTMLImageElement>("#fire-magic");

      /*
       * Switch Magician to
       * casting sprite.
       */
      if (enemySprite) {
        enemySprite.src = magicianAttackSprite;
      }

      /*
       * Start fireball.
       */
      fireMagic?.classList.add("fire-magic-casting");

      await wait(220);

      /*
       * Apply actual damage.
       */
      const enemyAttacked = enemy.attack(hero);

      if (enemyAttacked) {
        const damageDealt = heroHpBefore - hero.currentHealth;

        combatLog.unshift(
          `${enemy.name} cast Fire Magic and dealt ${damageDealt} damage to ${hero.name}.`,
        );

        heroSprite?.classList.add("taking-damage");
      }

      await wait(280);

      /*
       * Remove fireball effect.
       */
      fireMagic?.classList.remove("fire-magic-casting");

      heroSprite?.classList.remove("taking-damage");

      /*
       * Magician returns to
       * idle sprite.
       */
      if (enemySprite) {
        enemySprite.src = magicianSprite;
      }
    } else {

    /* =====================
         GOBLIN / OGRE ATTACK
      ====================== */
      if (enemySprite) {
        enemySprite.src = getEnemyAttackSprite();
      }

      enemySprite?.classList.add("enemy-attacking");

      await wait(180);

      const enemyAttacked = enemy.attack(hero);

      if (enemyAttacked) {
        const damageDealt = heroHpBefore - hero.currentHealth;

        combatLog.unshift(
          `${enemy.name} dealt ${damageDealt} damage to ${hero.name}.`,
        );

        heroSprite?.classList.add("taking-damage");
      }

      await wait(180);

      enemySprite?.classList.remove("enemy-attacking");

      if (enemySprite) {
        enemySprite.src = getEnemySprite();
      }

      heroSprite?.classList.remove("taking-damage");
    }

    /* =====================
         GAME OVER
      ====================== */

    if (hero.isDead() && !gameOverLogged) {
      combatLog.unshift(`${hero.name} died! Game Over.`);

      gameOverLogged = true;
    }

    render();
  });
}

/* =========================
   NEXT ENEMY
========================= */

function setupNextEnemyButton(): void {
  const nextEnemyButton =
    document.querySelector<HTMLButtonElement>("#next-enemy-button");

  nextEnemyButton?.addEventListener("click", () => {
    if (enemyIndex >= enemies.length - 1) {
      return;
    }

    enemyIndex++;

    enemy = enemies[enemyIndex];

    combatLog.unshift(`${enemy.name} appears!`);

    render();
  });
}

/* =========================
   PANEL BUTTONS
========================= */

function setupPanelButtons(): void {
  const inventoryToggle =
    document.querySelector<HTMLButtonElement>("#inventory-toggle");

  const equipmentToggle =
    document.querySelector<HTMLButtonElement>("#equipment-toggle");

  const shopToggle = document.querySelector<HTMLButtonElement>("#shop-toggle");

  inventoryToggle?.addEventListener("click", () => {
    activePanel = "inventory";

    render();
  });

  equipmentToggle?.addEventListener("click", () => {
    activePanel = "equipment";

    render();
  });

  shopToggle?.addEventListener("click", () => {
    activePanel = "shop";

    render();
  });
}

/* =========================
   INVENTORY BUTTONS
========================= */

function setupItemButtons(): void {
  const itemButtons =
    document.querySelectorAll<HTMLButtonElement>(".item-button");

  itemButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const itemId = Number(button.dataset.itemId);

      const item = hero.inventory.getItemById(itemId);

      if (!item) {
        return;
      }

      if (item.type === ItemType.Potion) {
        hero.useItem(itemId);
      } else {
        hero.equipItem(itemId);
      }

      render();
    });
  });
}

/* =========================
   SHOP BUTTONS
========================= */

function setupShopButtons(): void {
  const buyButtons =
    document.querySelectorAll<HTMLButtonElement>(".buy-button");

  buyButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const itemId = Number(button.dataset.itemId);

      const item = shop.getItemById(itemId);

      if (!item) {
        return;
      }

      const bought = shop.buyItem(itemId, hero);

      if (bought) {
        combatLog.unshift(
          `${hero.name} bought ${item.name} for ${item.value} gold.`,
        );
      } else {
        combatLog.unshift(`Could not buy ${item.name}.`);
      }

      render();
    });
  });
}

/* =========================
   ITEM ICON
========================= */

function getItemIcon(item: Item): string {
  switch (item.name) {
    case "Axe":
      return basicAxeIcon;

    case "Supreme Axe":
      return battleAxeIcon;

    case "Iron Armor":
      return armorIcon;

    case "Strength Ring":
      return strengthIcon;

    case "Health Potion":
      return healthPotionIcon;

    case "Mana Potion":
      return manaPotionIcon;

    case "Super Potion":
      return superPotionIcon;

    default:
      return "";
  }
}

/* =========================
   WAIT
========================= */

function wait(milliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

render();
