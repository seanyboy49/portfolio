import { Dispatch, SetStateAction } from "react";

import Boundary from "./Boundary";
import Sprite from "./Sprite";
import Door from "./Door";
import Prompt from "./Prompt";
import { Keys, KeysPressed, TILE_WIDTH } from "./types";
import { CanvasGame, EventHandler, Events } from "../types";
import { IDs } from "./collisions";
import { GameMap } from "./types";
import {
  padRectangle,
  Rectangle,
  rectangularCollision,
  rectangularDoorCollision,
} from "../../utilities";

type Collisions = number[];

export type RPGGameState = {
  showDialogue: boolean;
  dialogue?: { title: string; content: GameMap.Content[] };
};

export type UpdateGameState = Dispatch<SetStateAction<RPGGameState>>;

interface IRPGGame {
  ctx: CanvasRenderingContext2D;
  mapsConfig: GameMap.Maps;
  map: GameMap.MapNames;
  player: Sprite;
  updateGameState: UpdateGameState;
}

class RPGGame implements CanvasGame {
  ctx: CanvasRenderingContext2D;
  mapsConfig: GameMap.Maps;
  map: GameMap.MapNames;
  background: Sprite;
  player: Sprite;
  keyEvents: KeysPressed; // A map of which key(s) are currently being pressed
  boundaries: Boundary[]; // An array of Boundaries that cause collisions
  doors: Door[]; // An array of Doors that lead to other maps
  foreground?: Sprite;
  prompts?: Prompt[]; // An array of dialogue Prompts
  animations?: Sprite[]; // An array of Sprites that autoPlay and loop
  collisionDirection?: Keys; // The direction the player was moving when colliding
  eventListeners: EventHandler[];
  updateGameState: UpdateGameState;
  cache: Map<
    GameMap.MapNames,
    {
      background: Sprite;
      foreground?: Sprite;
      doors: Door[];
      boundaries: Boundary[];
      animations?: Sprite[];
      prompts?: Prompt[];
    }
  >;

  public animationId?: number;

  constructor({ ctx, updateGameState, mapsConfig, player, map }: IRPGGame) {
    this.ctx = ctx;
    this.updateGameState = updateGameState;
    this.mapsConfig = mapsConfig;
    this.map = map;
    this.player = player;
    this.cache = new Map();

    // Sets background, foreground, doors, boundaries
    this.loadMap(this.map);

    // Keep track of currently pressed keys
    this.keyEvents = {
      [Keys.W]: {
        pressed: false,
      },
      [Keys.A]: {
        pressed: false,
      },
      [Keys.S]: {
        pressed: false,
      },
      [Keys.D]: {
        pressed: false,
      },
    };

    // Register event listeners
    this.eventListeners = [
      {
        event: Events.KEYDOWN,
        handler: this.handleKeyDown.bind(this),
      },
      {
        event: Events.KEYUP,
        handler: this.handleKeyUp.bind(this),
      },
    ];
  }

  /**
   * The main animation loop to be handled in useCanvas
   * Draw each game element
   * Detect for collisions with boundaries, doors, and prompts
   * Handle keyboard input for each game element
   */
  public draw() {
    // Set canvas fill style to transparent so we don't get side effects from other objects setting fill styles
    // this.ctx.fillStyle = `rgba(0,0,0,0.1)`;
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.fillStyle = `rgba(0,0,0,0)`;

    // You must pass an arrow function to keep the reference to this
    this.animationId = requestAnimationFrame(() => this.draw());

    // Draw elements
    this.background.draw();
    this.animations?.forEach((a) => a.draw());
    this.player.draw();
    this.foreground?.draw();
    this.boundaries.forEach((b) => b.draw());
    this.doors.forEach((d) => d.draw());
    this.prompts?.forEach((p) => p.draw());

    // Handle collision detection
    // Initialize to undefined because it should only be defined when a collision is detected
    this.collisionDirection = undefined;
    this.handleCollisions(this.keyEvents);
    this.handleDoorEntry(this.keyEvents);
    this.handlePrompt(this.keyEvents);

    // Handle keyboard input for Player
    this.player.handleKeyboardInput(this.keyEvents);

    // Handle keyboard input for movables
    this.animations?.forEach((a) =>
      a.handleKeyboardInput(this.keyEvents, this.collisionDirection)
    );
    this.background.handleKeyboardInput(
      this.keyEvents,
      this.collisionDirection
    );
    this.foreground?.handleKeyboardInput(
      this.keyEvents,
      this.collisionDirection
    );
    this.boundaries.forEach((b) =>
      b.handleKeyboardInput(this.keyEvents, this.collisionDirection)
    );
    this.doors.forEach((b) =>
      b.handleKeyboardInput(this.keyEvents, this.collisionDirection)
    );
    this.prompts?.forEach((p) =>
      p.handleKeyboardInput(this.keyEvents, this.collisionDirection)
    );
  }

  private handleCollisions(keyEvents: KeysPressed) {
    const isKeyPressed = Object.values(keyEvents).some(
      (x) => x.pressed === true
    );
    if (!isKeyPressed) return;
    if (!this.player.collisionBox) return;

    for (let i = 0; i <= this.boundaries.length - 1; i++) {
      const boundary = padRectangle(this.boundaries[i], keyEvents);

      // If there is a collision, set the collision direction
      if (rectangularCollision(this.player.collisionBox, boundary)) {
        if (keyEvents[Keys.W].pressed) {
          this.collisionDirection = Keys.W;
        } else if (keyEvents[Keys.S].pressed) {
          this.collisionDirection = Keys.S;
        } else if (keyEvents[Keys.A].pressed) {
          this.collisionDirection = Keys.A;
        } else if (keyEvents[Keys.D].pressed) {
          this.collisionDirection = Keys.D;
        }
      }
    }
  }

  /**
   * Similar to handleCollision. Detects collisions with doors and loads a new map upon door entry.
   */
  private handleDoorEntry(keyEvents: KeysPressed) {
    const isKeyPressed = Object.values(keyEvents).some(
      (x) => x.pressed === true
    );
    if (!isKeyPressed) return;
    if (!this.player.collisionBox) return;

    for (let i = 0; i <= this.doors.length - 1; i++) {
      const door = this.doors[i];
      const paddedDoor = padRectangle(this.doors[i], keyEvents);

      // If there is a door collision, load the new map
      if (
        rectangularDoorCollision(
          this.player.collisionBox,
          paddedDoor,
          door.entryDirection
        )
      ) {
        // Pause animation while we load the new map
        cancelAnimationFrame(this.animationId!);
        this.loadMap(door.map);
        // Restart animation
        this.draw();
      }
    }
  }
  private handlePrompt(keyEvents: KeysPressed) {
    if (!this.prompts) return;
    const isKeyPressed = Object.values(keyEvents).some(
      (x) => x.pressed === true
    );
    if (!isKeyPressed) return;
    if (!this.player.collisionBox) return;

    for (let i = 0; i <= this.prompts.length - 1; i++) {
      const prompt = this.prompts[i];

      const paddedPrompt = padRectangle(prompt, keyEvents);

      // If the player is in the boundaries of a prompt, we want to update React state
      // to display the prompt
      if (rectangularCollision(this.player as Rectangle, paddedPrompt)) {
        this.updateGameState((prev) => {
          if (prev.dialogue?.title !== prompt.dialogue.title)
            return {
              ...prev,
              dialogue: prompt.dialogue,
            };
          return prev;
        });
      } else {
        /**
         * This is tricky.
         * Since this inner logic runs for every prompt, we only want to clear the content
         * once because every time we update state, we'll trigger a re-render.
         * We clear the content and automatically set showContent to false
         */
        this.updateGameState((prev) => {
          if (prev.dialogue === prompt.dialogue) {
            return {
              ...prev,
              dialogue: undefined,
              showDialogue: false,
            };
          }
          // We can cancel the state update by simply returning prev
          return prev;
        });
      }
    }
  }

  /**
   * Sets the new mapConfig and updates background, foreground, boundaries, doors, animations, etc
   */
  private loadMap(map: GameMap.MapNames) {
    // Set the new map
    this.map = map;

    // Load from cache if possible
    if (this.cache.has(map)) {
      const mapConfigFromCache = this.cache.get(map)!;
      const { background, foreground, doors, boundaries, prompts, animations } =
        mapConfigFromCache;

      // Optional properties
      this.foreground = foreground || undefined;
      this.prompts = prompts || undefined;
      this.animations = animations || undefined;

      // Required properties
      this.background = background;
      this.doors = doors;
      this.boundaries = boundaries;
    }
    // If cache miss, set up the new map from scratch and store it in cache
    else {
      const currentMapConfig = this.mapsConfig[this.map];
      const { offset } = currentMapConfig;

      // Optional properties
      this.foreground = currentMapConfig.imageForegroundSrc
        ? new Sprite({
            ctx: this.ctx,
            position: {
              x: offset.x,
              y: offset.y,
            },
            imageSrc: currentMapConfig.imageForegroundSrc,
          })
        : undefined;

      this.animations = currentMapConfig.animations
        ? this.createAutoPlayAnimations(currentMapConfig.animations)
        : undefined;

      this.prompts = currentMapConfig.prompts
        ? this.createPrompts(currentMapConfig.prompts)
        : undefined;

      // Required properties
      this.background = new Sprite({
        ctx: this.ctx,
        position: { x: offset.x, y: offset.y },
        imageSrc: currentMapConfig.imageBackgroundSrc,
      });
      this.boundaries = this.createBoundariesFromCollisions(
        currentMapConfig.collisions
      );
      this.doors = this.createDoors(currentMapConfig.doors);

      // Set cache values
      this.cache.set(map, {
        background: this.background,
        boundaries: this.boundaries,
        doors: this.doors,
        foreground: this.foreground,
        animations: this.animations,
      });
    }
  }

  private handleKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case Keys.W:
        this.keyEvents.w.pressed = true;
        break;
      case Keys.S:
        this.keyEvents.s.pressed = true;
        break;
      case Keys.A:
        this.keyEvents.a.pressed = true;
        break;
      case Keys.D:
        this.keyEvents.d.pressed = true;
        break;
      case " ":
        // Default behavior is scroll the page down
        event.preventDefault();

        this.updateGameState((prev) => {
          if (prev.dialogue) {
            return {
              ...prev,
              showDialogue: !prev.showDialogue,
            };
          }
          return prev;
        });
        break;
    }
  }

  private handleKeyUp(event: KeyboardEvent) {
    switch (event.key) {
      case Keys.W:
        this.keyEvents.w.pressed = false;
        break;
      case Keys.S:
        this.keyEvents.s.pressed = false;
        break;
      case Keys.A:
        this.keyEvents.a.pressed = false;
        break;
      case Keys.D:
        this.keyEvents.d.pressed = false;
        break;
    }
  }

  private createBoundariesFromCollisions(collisions: Collisions) {
    const currentMapConfig = this.mapsConfig[this.map];
    const { dimensions, zoomScale, offset } = currentMapConfig;

    // Set up a 2d Array of collisions
    const collisionsMap: number[][] = [];
    for (let i = 0; i < collisions.length; i += dimensions.width) {
      collisionsMap.push(collisions.slice(i, i + dimensions.width));
    }

    return collisionsMap
      .flatMap((row, y) => {
        return row.map((cell, x) => {
          if (cell !== IDs.EMPTY) {
            return new Boundary({
              ctx: this.ctx,
              zoomScale: zoomScale,
              ID: cell,
              position: {
                x: x * TILE_WIDTH * zoomScale + offset.x,
                y: y * TILE_WIDTH * zoomScale + offset.y,
              },
            });
          }
          // Get other positions
          // if (cell === IDs.PROMPT) {
          //   console.log("x", x);
          //   console.log("y", y);
          // }
          return null;
        });
      })
      .filter((x): x is Boundary => x !== null);
  }

  private createDoors(doors: GameMap.Door[]) {
    const currentMapConfig = this.mapsConfig[this.map];
    const { zoomScale, offset } = currentMapConfig;

    return doors.map((door) => {
      return new Door({
        ctx: this.ctx,
        zoomScale: zoomScale,
        position: {
          x: door.position.x * TILE_WIDTH * zoomScale + offset.x,
          y: door.position.y * TILE_WIDTH * zoomScale + +offset.y,
        },
        entryDirection: door.entryDirection,
        span: door.span,
        map: door.map,
      });
    });
  }

  private createPrompts(prompts: GameMap.Prompt[]) {
    const currentMapConfig = this.mapsConfig[this.map];
    const { zoomScale, offset } = currentMapConfig;

    return prompts.map((prompt) => {
      return new Prompt({
        ctx: this.ctx,
        zoomScale: zoomScale,
        position: {
          x: prompt.position.x * TILE_WIDTH * zoomScale + offset.x,
          y: prompt.position.y * TILE_WIDTH * zoomScale + +offset.y,
        },
        title: prompt.title,
        content: prompt.content,
        span: prompt.span,
      });
    });
  }

  private createAutoPlayAnimations(animations: GameMap.AutoPlayAnimation[]) {
    const currentMapConfig = this.mapsConfig[this.map];
    const { zoomScale, offset } = currentMapConfig;

    return animations.map((animation) => {
      return new Sprite({
        ctx: this.ctx,
        imageSrc: animation.spriteSheetSrc,
        movable: true,
        autoLoop: true,
        frames: animation.frames,
        position: {
          x: animation.position.x * TILE_WIDTH * zoomScale + offset.x,
          y: animation.position.y * TILE_WIDTH * zoomScale + offset.y,
        },
      });
    });
  }
}

export default RPGGame;
