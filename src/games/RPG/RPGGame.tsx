import {
  padRectangle,
  rectangularCollision,
  rectangularDoorCollision,
} from "../../utilities";
import { CanvasGame, EventHandler } from "../types";
import Boundary from "./Boundary";
import Sprite from "./Sprite";
import { Keys, KeysPressed, TILE_WIDTH } from "./types";
import { Events } from "../types";
import { COLLISION } from "./collisions";
import Door from "./Door";
import { DoorConfig, Maps, MapConfig, MAPS_CONFIG } from "./maps";

type Collisions = number[];

interface IRPGGame {
  ctx: CanvasRenderingContext2D;
  mapConfig: MapConfig;
  player: Sprite;
}

class RPGGame implements CanvasGame {
  ctx: CanvasRenderingContext2D;
  mapConfig: MapConfig;
  background: Sprite;
  foreground?: Sprite;
  player: Sprite;
  keyEvents: KeysPressed; // A map of which key(s) are currently being pressed
  boundaries: Boundary[]; // An array of Boundaries that cause collisions
  doors: Door[]; // An array of Doors that lead to other maps
  collisionDirection?: Keys; // The direction the player was moving when colliding
  isPlaying = true;
  eventListeners: EventHandler[];

  public animationId?: number;

  constructor({ ctx, mapConfig, player }: IRPGGame) {
    this.mapConfig = mapConfig;
    this.ctx = ctx;

    const background = new Sprite({
      ctx: ctx,
      position: { x: mapConfig.offset.x, y: mapConfig.offset.y },
      imageSrc: mapConfig.imageBackgroundSrc,
    });

    this.background = background;

    if (mapConfig.imageForegroundSrc) {
      const foreground = new Sprite({
        ctx: ctx,
        position: { x: mapConfig.offset.x, y: mapConfig.offset.y },
        imageSrc: mapConfig.imageForegroundSrc,
      });
      this.foreground = foreground;
    }

    this.player = player;
    this.boundaries = this.createBoundariesFromCollisions(mapConfig.collisions);
    this.doors = this.createDoors(mapConfig.doors);

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
   * Detect for collisions
   * Handle keyboard input for each game element
   */
  public draw() {
    // You must pass an arrow function to keep the reference to this
    this.animationId = requestAnimationFrame(() => this.draw());

    this.background.draw();
    this.player.draw();
    this.foreground?.draw();
    this.boundaries.forEach((b) => b.draw());
    this.doors.forEach((d) => d.draw());

    // Handle collision detection
    // Initialize to undefined because it should only be defined when a collision is detected
    this.collisionDirection = undefined;
    this.handleCollisions(this.keyEvents);
    this.handleDoorEntry(this.keyEvents);

    // Handle keyboard input for Player
    this.player.handleKeyboardInput(this.keyEvents);

    // Handle keyboard input for movables
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
    this.doors.forEach((b) => b.handleKeyboardInput(this.keyEvents));
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
   * Similar to handleCollision. Detects collisions with doors and loads a new map upon door entry
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
      if (rectangularDoorCollision(this.player.collisionBox, paddedDoor)) {
        this.loadMap(door.map);
      }
    }
  }

  /**
   * Sets the new mapConfig and updates background, foreground, boundaries and doors
   */
  private loadMap(map: Maps) {
    const newMap = MAPS_CONFIG[map];
    this.mapConfig = newMap;

    const background = new Sprite({
      ctx: this.ctx,
      position: { x: newMap.offset.x, y: newMap.offset.y },
      imageSrc: newMap.imageBackgroundSrc,
    });

    // Wipe ctx and briefly white it out
    // this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.1)";

    // this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    cancelAnimationFrame(this.animationId!);

    // Add a slight delay to give the illusion of loading
    setTimeout(() => {
      this.background = background;

      // Not all maps have a foreground
      if (newMap.imageForegroundSrc) {
        const foreground = new Sprite({
          ctx: this.ctx,
          position: { x: newMap.offset.x, y: newMap.offset.y },
          imageSrc: newMap.imageForegroundSrc,
        });

        this.foreground = foreground;
      }

      this.boundaries = this.createBoundariesFromCollisions(newMap.collisions);

      this.doors = [];

      this.draw();
    }, 100);
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
    const { dimensions, offset, zoomScale } = this.mapConfig;

    // Set up a 2d Array of collisions
    const collisionsMap: number[][] = [];
    for (let i = 0; i < collisions.length; i += dimensions.width) {
      collisionsMap.push(collisions.slice(i, i + dimensions.width));
    }

    return collisionsMap
      .flatMap((row, y) => {
        return row.map((cell, x) => {
          if (cell === COLLISION) {
            return new Boundary({
              ctx: this.ctx,
              zoomScale: zoomScale,
              position: {
                x: x * TILE_WIDTH * zoomScale + offset.x,
                y: y * TILE_WIDTH * zoomScale + offset.y,
              },
            });
          }
          return null;
        });
      })
      .filter((x): x is Boundary => x !== null);
  }

  private createDoors(doors: DoorConfig[]) {
    const { zoomScale } = this.mapConfig;
    return doors.map((door) => {
      return new Door({
        ctx: this.ctx,
        zoomScale: zoomScale,
        position: {
          x: door.position.x,
          y: door.position.y,
        },
        map: door.map,
      });
    });
  }
}

// ctx
// background
// foreground
// collisions
// player
// sprites
// animation loop

export default RPGGame;
