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
   SPLASH
========================= */

import bannerImage from "./assets/banner.png";

/* =========================
   HERO ASSETS
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
   PARALLAX BACKGROUNDS
========================= */

import goblinBack from "./assets/backgrounds/goblin-back.png";
import goblinMid from "./assets/backgrounds/goblin-mid.png";
import goblinFront from "./assets/backgrounds/goblin-front.png";

import magicianBack from "./assets/backgrounds/magician-back.png";
import magicianMid from "./assets/backgrounds/magician-mid.png";
import magicianFront from "./assets/backgrounds/magician-front.png";

import ogreBack from "./assets/backgrounds/ogre-back.png";
import ogreMid from "./assets/backgrounds/ogre-mid.png";
import ogreFront from "./assets/backgrounds/ogre-front.png";

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

import leatherArmorIcon from "./assets/icons/leatherarmor.png";

import strengthRingIcon from "./assets/icons/strengthring.png";

import armorIcon from "./assets/icons/defenseicon.png";
import attackIcon from "./assets/icons/attackicon.png";
import strengthIcon from "./assets/icons/stregthicon.png";

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
  new Enemy(
    "Goblin",
    60,
    60,
    10,
    5,
    20,
    225,
  ),

  new Enemy(
    "Magician",
    90,
    90,
    16,
    4,
    35,
    625,
  ),

  new Enemy(
    "Ogre Boss",
    180,
    180,
    26,
    12,
    80,
    10000,
  ),
];

let enemyIndex = 0;
let enemy = enemies[enemyIndex];

/* =========================
   STARTING ITEMS
========================= */

const axe = new Weapon(
  1,
  "Axe",
  5,
  500,
  15,
  100,
);

const healthPotion = new Potion(
  3,
  "Health Potion",
  0.25,
  25,
  30,
  0,
);

hero.pickUpItem(healthPotion);
hero.pickUpItem(axe);

hero.equipItem(axe.id);

/* =========================
   SHOP
========================= */

const shop = new Shop([

  new Weapon(
    102,
    "Supreme Axe",
    5,
    1000,
    30,
    250,
  ),

  new Potion(
    103,
    "Health Potion",
    0.25,
    25,
    30,
    0,
  ),

  new Potion(
    104,
    "Mana Potion",
    0.25,
    25,
    0,
    25,
  ),

  new Potion(
    105,
    "Super Potion",
    0.4,
    50,
    25,
    25,
  ),

  new Armor(
    106,
    "Leather Armor",
    10,
    300,
    10,
    100,
  ),

  new Ring(
    107,
    "Strength Ring",
    0.1,
    250,
    5,
    10,
  ),
]);

/* =========================
   UI STATE
========================= */

const combatLog: string[] = [];
const MAX_COMBAT_LOG_ENTRIES = 50;

function addCombatLog(
  message: string,
): void {
  combatLog.unshift(message);

  if (
    combatLog.length >
    MAX_COMBAT_LOG_ENTRIES
  ) {
    combatLog.length =
      MAX_COMBAT_LOG_ENTRIES;
  }
}

let activePanel:
  | "inventory"
  | "equipment"
  | "shop"
  = "inventory";

let gameOverLogged = false;

let gameStarted = false;
let gameEntering = false;
let isCombatAnimating = false;

/* =========================
   SPLASH
========================= */

function renderSplashScreen(): void {
  document.querySelector<HTMLDivElement>(
    "#app",
  )!.innerHTML = `
    <section
      id="splash-screen"
      class="
        splash-screen
        ${gameEntering ? "splash-leaving" : ""}
      "
      role="button"
      tabindex="0"
      aria-label="Play Conan's Codeventures"
    >

      <img
        class="splash-background"
        src="${bannerImage}"
        alt="Conan's Codeventures"
      />

      <div class="splash-overlay"></div>

    </section>
  `;

  const splashScreen =
    document.querySelector<HTMLElement>(
      "#splash-screen",
    );

  splashScreen?.addEventListener(
    "click",
    startGame,
  );

  splashScreen?.addEventListener(
    "keydown",
    (event) => {
      if (
        event.key === "Enter" ||
        event.key === " "
      ) {
        startGame();
      }
    },
  );
}

async function startGame(): Promise<void> {
  if (gameEntering) {
    return;
  }

  gameEntering = true;

  const splash =
    document.querySelector<HTMLElement>(
      "#splash-screen",
    );

  splash?.classList.add(
    "splash-leaving",
  );

  await wait(1400);

  gameStarted = true;

  render();

  const game =
    document.querySelector<HTMLElement>(
      ".game",
    );

  game?.classList.add(
    "game-entering",
  );
}

/* =========================
   ENEMY VISUAL HELPERS
========================= */

function getEnemySprite(): string {
  if (enemy.name === "Goblin") {
    return enemy.isDead()
      ? goblinDeadSprite
      : goblinSprite;
  }

  if (enemy.name === "Magician") {
    return enemy.isDead()
      ? magicianDeadSprite
      : magicianSprite;
  }

  return enemy.isDead()
    ? ogreDeadSprite
    : ogreSprite;
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
   MAP HELPERS
========================= */

function getEnemyMapClass(): string {
  if (enemy.name === "Goblin") {
    return "map-goblin";
  }

  if (enemy.name === "Magician") {
    return "map-magician";
  }

  return "map-ogre";
}

function getMapLayers(): {
  back: string;
  mid: string;
  front: string;
} {
  if (enemy.name === "Goblin") {
    return {
      back: goblinBack,
      mid: goblinMid,
      front: goblinFront,
    };
  }

  if (enemy.name === "Magician") {
    return {
      back: magicianBack,
      mid: magicianMid,
      front: magicianFront,
    };
  }

  return {
    back: ogreBack,
    mid: ogreMid,
    front: ogreFront,
  };
}

/* =========================
   RENDER
========================= */

function render(): void {
  if (!gameStarted) {
    renderSplashScreen();
    return;
  }

  const mapLayers =
    getMapLayers();

  const mapClass =
    getEnemyMapClass();

  const heroHealthPercentage =
    clampPercentage(
      (hero.currentHealth /
        hero.maxHealth) *
        100,
    );

  const heroManaPercentage =
    clampPercentage(
      (hero.currentMana /
        hero.maxMana) *
        100,
    );

  const heroXpPercentage =
    clampPercentage(
      (hero.experience /
        hero.experienceToNextLevel) *
        100,
    );

  const enemyHealthPercentage =
    clampPercentage(
      (enemy.currentHealth /
        enemy.maxHealth) *
        100,
    );

  const combatLogHtml = combatLog
    .slice(0, 8)
    .map(
      (message) =>
        `<p>${message}</p>`,
    )
    .join("");

  /* =========================
     INVENTORY
  ========================= */

  const inventoryHtml =
  hero.inventory.items
    .map((item) => {
      const buttonText =
        item.type === ItemType.Potion
          ? "Use"
          : "Equip";

      return `
        <div class="inventory-item">

          <div class="inventory-name">

            <img
              class="item-icon"
              src="${getItemIcon(item)}"
              alt="${item.name}"
            />

            <strong>
              ${item.name}
            </strong>

          </div>

          <span class="inventory-type">
            ${getItemTypeLabel(item)}
          </span>

          <span class="inventory-quantity">
            1
          </span>

          <span class="inventory-weight">
            ${item.weight} kg
          </span>

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

    <span class="equipment-slot">
      Weapon
    </span>

    <strong class="equipment-name">
      ${hero.equipment.weapon?.name ?? "Empty"}
    </strong>

    <span class="equipment-bonus">
      ${
        hero.equipment.weapon
          ? getItemDescription(
              hero.equipment.weapon,
            )
          : "—"
      }
    </span>

  </div>


  <div class="equipment-item">

    <span class="equipment-slot">
      Armor
    </span>

    <strong class="equipment-name">
      ${hero.equipment.armor?.name ?? "Empty"}
    </strong>

    <span class="equipment-bonus">
      ${
        hero.equipment.armor
          ? getItemDescription(
              hero.equipment.armor,
            )
          : "—"
      }
    </span>

  </div>


  <div class="equipment-item">

    <span class="equipment-slot">
      Ring
    </span>

    <strong class="equipment-name">
      ${hero.equipment.ring?.name ?? "Empty"}
    </strong>

    <span class="equipment-bonus">
      ${
        hero.equipment.ring
          ? getItemDescription(
              hero.equipment.ring,
            )
          : "—"
      }
    </span>

  </div>
`;

  /* =========================
     SHOP
  ========================= */

  const shopHtml =
  shop.items
    .map((item) => {
      return `
        <div class="shop-item">

          <div class="shop-item-name">

            <img
              class="shop-item-icon"
              src="${getItemIcon(item)}"
              alt="${item.name}"
            />

            <strong>
              ${item.name}
            </strong>

          </div>


          <span class="shop-description">
            ${getItemDescription(item)}
          </span>


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
            ${
              hero.gold < item.value
                ? "disabled"
                : ""
            }
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
          class="
            hero-panel
            inventory-panel
          "
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
          class="
            hero-panel
            equipment-panel
          "
          style="
            --panel-bg:
            url('${equipmentBackground}')
          "
        >

          <div
            class="
              panel-content
              equipment-content
            "
          >
            ${equipmentHtml}
          </div>

        </section>
      `;

      break;

    case "shop":
      activePanelHtml = `
        <section
          class="
            hero-panel
            shop-panel
          "
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
    <div class="game-world">

      <!-- PARALLAX -->

      <div
        class="
          parallax-background
          ${mapClass}
        "
      >

        <div
          class="
            parallax-layer
            parallax-back
          "
          style="
            background-image:
            url('${mapLayers.back}')
          "
        ></div>

        <div
          class="
            parallax-layer
            parallax-mid
          "
          style="
            background-image:
            url('${mapLayers.mid}')
          "
        ></div>

        <div
          class="
            parallax-layer
            parallax-front
          "
          style="
            background-image:
            url('${mapLayers.front}')
          "
        ></div>

        <div
          class="parallax-darkness"
        ></div>

        <div
          class="ambient-glow"
        ></div>

      </div>

      <!-- GAME -->

      <main class="game">

        <h1 class="main-game-title">
          Conan's Codeventures
        </h1>

        <section class="battle-layout">

          <!-- HERO -->

          <section class="character-card">

            <h2 class="character-name">

              ${hero.name}

              ${
                hero.isDead()
                  ? "☠️"
                  : ""
              }

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

                <span>
                  Level
                </span>

                <strong>
                  ${hero.level}
                </strong>

              </div>

              <div class="stat-label">

                <span>HP</span>

                <span>
                  ${hero.currentHealth}
                  /
                  ${hero.maxHealth}
                </span>

              </div>

              <div class="bar">

                <div
                  class="health-fill"
                  style="
                    width:
                    ${heroHealthPercentage}%
                  "
                ></div>

              </div>

              <div class="stat-label">

                <span>Mana</span>

                <span>
                  ${hero.currentMana}
                  /
                  ${hero.maxMana}
                </span>

              </div>

              <div class="bar">

                <div
                  class="mana-fill"
                  style="
                    width:
                    ${heroManaPercentage}%
                  "
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
                  style="
                    width:
                    ${heroXpPercentage}%
                  "
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

                <strong>
                  ${hero.gold}
                </strong>

              </div>

              <div class="stat-row">

                <span class="stat-name">

                  <img
                    class="stat-icon"
                    src="${attackIcon}"
                    alt="Attack"
                  />

                  Attack

                </span>

                <strong>
                  ${hero.getAttack()}
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
                  ${hero.getDefense()}
                </strong>

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

                <strong>
                  ${hero.getStrength()}
                </strong>

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
                  `
                    <p>
                      No combat yet.
                    </p>
                  `
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

              ${
                enemy.isDead()
                  ? "☠️"
                  : ""
              }

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
                  style="
                    width:
                    ${enemyHealthPercentage}%
                  "
                ></div>

              </div>

              <div class="stat-row">

                <span class="stat-name">

                  <img
                    class="stat-icon"
                    src="${attackIcon}"
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
                  activePanel ===
                  "inventory"
                    ? "active"
                    : ""
                }"
              >
                Inventory
              </button>

              <button
                id="equipment-toggle"
                class="${
                  activePanel ===
                  "equipment"
                    ? "active"
                    : ""
                }"
              >
                Equipment
              </button>

              <button
                id="shop-toggle"
                class="${
                  activePanel ===
                  "shop"
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
          enemyIndex ===
            enemies.length - 1 &&
          enemy.isDead()
            ? `
              <div class="end-screen">

                <div
                  class="
                    end-screen-content
                  "
                >

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

    </div>
  `;

  setupAttackButton();
  setupPanelButtons();
  setupItemButtons();
  setupShopButtons();
  setupNextEnemyButton();
  setupParallax();
}

/* =========================
   PARALLAX
========================= */

function setupParallax(): void {
  if (
    window.matchMedia(
      "(max-width: 700px)",
    ).matches
  ) {
    window.onmousemove = null;
    return;
  }

  const back =
    document.querySelector<HTMLElement>(
      ".parallax-back",
    );

  const mid =
    document.querySelector<HTMLElement>(
      ".parallax-mid",
    );

  const front =
    document.querySelector<HTMLElement>(
      ".parallax-front",
    );

  if (
    !back ||
    !mid ||
    !front
  ) {
    return;
  }

  window.onmousemove = (
    event: MouseEvent,
  ) => {
    const mouseX =
      event.clientX /
        window.innerWidth -
      0.5;

    const mouseY =
      event.clientY /
        window.innerHeight -
      0.5;

    back.style.transform = `
      translate(
        ${mouseX * -8}px,
        ${mouseY * -4}px
      )
      scale(1.06)
    `;

    mid.style.transform = `
      translate(
        ${mouseX * -16}px,
        ${mouseY * -8}px
      )
      scale(1.09)
    `;

    front.style.transform = `
      translate(
        ${mouseX * -28}px,
        ${mouseY * -12}px
      )
      scale(1.13)
    `;
  };
}

/* =========================
   ATTACK
========================= */

function setupAttackButton(): void {
  const attackButton =
    document.querySelector<HTMLButtonElement>(
      "#attack-button",
    );

  attackButton?.addEventListener(
    "click",
    async () => {
      if (
        isCombatAnimating ||
        hero.isDead() ||
        enemy.isDead()
      ) {
        return;
      }

      isCombatAnimating = true;
      attackButton.disabled = true;

      try {
        const enemyHpBefore =
        enemy.currentHealth;

      const heroHpBefore =
        hero.currentHealth;

      const levelBefore =
        hero.level;

      const heroSprite =
        document.querySelector<HTMLImageElement>(
          "#hero-sprite",
        );

      const enemySprite =
        document.querySelector<HTMLImageElement>(
          "#enemy-sprite",
        );

      /* HERO ATTACK */

      if (heroSprite) {
        heroSprite.src =
          conanAttackSprite;
      }

      heroSprite?.classList.add(
        "hero-attacking",
      );

      await wait(180);

      const heroAttacked =
        hero.attack(enemy);

      const leveledUp =
        hero.level >
        levelBefore;

      if (heroAttacked) {
        const damageDealt =
          enemyHpBefore -
          enemy.currentHealth;

        addCombatLog(
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

      if (heroSprite) {
        heroSprite.src =
          conanSprite;
      }

      enemySprite?.classList.remove(
        "taking-damage",
      );

      /* ENEMY DEAD */

      if (enemy.isDead()) {
        addCombatLog(
          `${enemy.name} died! ${hero.name} gained ${enemy.experienceReward} XP and ${enemy.goldReward} gold.`,
        );

        render();

        if (leveledUp) {
          const levelUpImage =
            document.querySelector<HTMLImageElement>(
              "#level-up",
            );

          levelUpImage?.classList.add(
            "show",
          );
        }

        return;
      }

      /* MAGICIAN */

      if (
        enemy.name ===
        "Magician"
      ) {
        const fireMagic =
          document.querySelector<HTMLImageElement>(
            "#fire-magic",
          );

        if (enemySprite) {
          enemySprite.src =
            magicianAttackSprite;
        }

        fireMagic?.classList.add(
          "fire-magic-casting",
        );

        await wait(220);

        const enemyAttacked =
          enemy.attack(hero);

        if (enemyAttacked) {
          const damageDealt =
            heroHpBefore -
            hero.currentHealth;

          addCombatLog(
            `${enemy.name} cast Fire Magic and dealt ${damageDealt} damage to ${hero.name}.`,
          );

          heroSprite?.classList.add(
            "taking-damage",
          );
        }

        await wait(280);

        fireMagic?.classList.remove(
          "fire-magic-casting",
        );

        heroSprite?.classList.remove(
          "taking-damage",
        );

        if (enemySprite) {
          enemySprite.src =
            magicianSprite;
        }
      }

      /* GOBLIN / OGRE */

      else {
        if (enemySprite) {
          enemySprite.src =
            getEnemyAttackSprite();
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

          addCombatLog(
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

        if (enemySprite) {
          enemySprite.src =
            getEnemySprite();
        }

        heroSprite?.classList.remove(
          "taking-damage",
        );
      }

      if (
        hero.isDead() &&
        !gameOverLogged
      ) {
        addCombatLog(
          `${hero.name} died! Game Over.`,
        );

        gameOverLogged = true;
      }

      render();
      } finally {
        isCombatAnimating = false;
      }
    },
  );
}

/* =========================
   NEXT ENEMY
========================= */

function setupNextEnemyButton(): void {
  const nextEnemyButton =
    document.querySelector<HTMLButtonElement>(
      "#next-enemy-button",
    );

  nextEnemyButton?.addEventListener(
    "click",
    () => {
      if (
        enemyIndex >=
        enemies.length - 1
      ) {
        return;
      }

      enemyIndex++;

      enemy =
        enemies[enemyIndex];

      addCombatLog(
        `${enemy.name} appears!`,
      );

      render();
    },
  );
}

/* =========================
   PANEL BUTTONS
========================= */

function setupPanelButtons(): void {
  const inventoryToggle =
    document.querySelector<HTMLButtonElement>(
      "#inventory-toggle",
    );

  const equipmentToggle =
    document.querySelector<HTMLButtonElement>(
      "#equipment-toggle",
    );

  const shopToggle =
    document.querySelector<HTMLButtonElement>(
      "#shop-toggle",
    );

  inventoryToggle?.addEventListener(
    "click",
    () => {
      activePanel =
        "inventory";

      render();
    },
  );

  equipmentToggle?.addEventListener(
    "click",
    () => {
      activePanel =
        "equipment";

      render();
    },
  );

  shopToggle?.addEventListener(
    "click",
    () => {
      activePanel =
        "shop";

      render();
    },
  );
}

/* =========================
   ITEMS
========================= */

function setupItemButtons(): void {
  const itemButtons =
    document.querySelectorAll<HTMLButtonElement>(
      ".item-button",
    );

  itemButtons.forEach(
    (button) => {
      button.addEventListener(
        "click",
        () => {
          const itemId =
            Number(
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
            item.type ===
            ItemType.Potion
          ) {
            hero.useItem(
              itemId,
            );
          } else {
            hero.equipItem(
              itemId,
            );
          }

          render();
        },
      );
    },
  );
}

/* =========================
   SHOP
========================= */

function setupShopButtons(): void {
  const buyButtons =
    document.querySelectorAll<HTMLButtonElement>(
      ".buy-button",
    );

  buyButtons.forEach(
    (button) => {
      button.addEventListener(
        "click",
        () => {
          const itemId =
            Number(
              button.dataset.itemId,
            );

          const item =
            shop.getItemById(
              itemId,
            );

          if (!item) {
            return;
          }

          const bought =
            shop.buyItem(
              itemId,
              hero,
            );

          if (bought) {
            addCombatLog(
              `${hero.name} bought ${item.name} for ${item.value} gold.`,
            );
          } else {
            addCombatLog(
              `Could not buy ${item.name}.`,
            );
          }

          render();
        },
      );
    },
  );
}

/* =========================
   ICON HELPER
========================= */

function getItemTypeLabel(
  item: Item,
): string {
  switch (item.type) {
    case ItemType.Weapon:
      return "Weapon";

    case ItemType.Armor:
      return "Armor";

    case ItemType.Ring:
      return "Ring";

    case ItemType.Potion:
      return "Potion";

    default:
      return "Item";
  }
}


function getItemDescription(
  item: Item,
): string {
  switch (item.name) {
    case "Axe":
      return "+15 Attack";

    case "Supreme Axe":
      return "+30 Attack";

    case "Leather Armor":
      return "+10 Defense";

    case "Strength Ring":
      return "+5 Strength";

    case "Health Potion":
      return "Restores 30 HP";

    case "Mana Potion":
      return "Restores 25 Mana";

    case "Super Potion":
      return "+25 HP / +25 Mana";

    default:
      return "";
  }
}

function getItemIcon(
  item: Item,
): string {
  switch (item.name) {
    case "Axe":
      return basicAxeIcon;

    case "Supreme Axe":
      return battleAxeIcon;

    case "Leather Armor":
      return leatherArmorIcon;

    case "Strength Ring":
      return strengthRingIcon;

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
   UI HELPERS
========================= */

function clampPercentage(
  value: number,
): number {
  return Math.max(
    0,
    Math.min(100, value),
  );
}


/* =========================
   WAIT
========================= */

function wait(
  milliseconds: number,
): Promise<void> {
  return new Promise(
    (resolve) => {
      setTimeout(
        resolve,
        milliseconds,
      );
    },
  );
}

render();