import { OFFSET } from "./types";
import {
  padRectangle,
  rectangularCollision,
  rectangularDoorCollision,
} from "../../utilities";
import { CanvasGame, EventHandler } from "../types";
import Boundary from "./Boundary";
import Sprite from "./Sprite";
import { Keys, KeysPressed } from "./types";
import { Events } from "../types";
import { COLLISION, DOOR } from "./collisions";
import Door from "./Door";
import { DoorConfig, Maps, MAPS_CONFIG } from "./maps";

type Collisions = number[][];

interface IRPGGame {
  ctx: CanvasRenderingContext2D;
  background: Sprite;
  player: Sprite;
  collisions: Collisions;
  doors: DoorConfig[];
}

class RPGGame implements CanvasGame {
  ctx: CanvasRenderingContext2D;
  background: Sprite;
  player: Sprite;
  keyEvents: KeysPressed; // A map of which key(s) are currently being pressed
  boundaries: Array<Boundary>; // An array of Boundaries that cause collisions
  doors: Array<Door>; // An array of Doors that lead to other maps
  collisionDirection?: Keys; // The direction the player was moving when colliding
  isPlaying = true;
  eventListeners: EventHandler[];

  public animationId?: number;

  constructor({ ctx, background, player, collisions, doors }: IRPGGame) {
    this.ctx = ctx;
    this.background = background;
    this.player = player;

    this.boundaries = this.createBoundariesFromCollisions(collisions);
    this.doors = this.createDoors(doors);

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
    this.boundaries.forEach((b) =>
      b.handleKeyboardInput(this.keyEvents, this.collisionDirection)
    );
    this.doors.forEach((b) =>
      b.handleKeyboardInput(this.keyEvents, this.collisionDirection)
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

  private handleDoorEntry(keyEvents: KeysPressed) {
    const isKeyPressed = Object.values(keyEvents).some(
      (x) => x.pressed === true
    );
    if (!isKeyPressed) return;
    if (!this.player.collisionBox) return;

    for (let i = 0; i <= this.doors.length - 1; i++) {
      const door = this.doors[i];
      const paddedDoor = padRectangle(this.doors[i], keyEvents);

      // If there is a collision, set the collision direction
      if (rectangularDoorCollision(this.player.collisionBox, paddedDoor)) {
        this.loadMap(door.map);
        // if (keyEvents[Keys.W].pressed) {
        //   this.collisionDirection = Keys.W;
        // } else if (keyEvents[Keys.S].pressed) {
        //   this.collisionDirection = Keys.S;
        // } else if (keyEvents[Keys.A].pressed) {
        //   this.collisionDirection = Keys.A;
        // } else if (keyEvents[Keys.D].pressed) {
        //   this.collisionDirection = Keys.D;
        // }
      }
    }
  }

  private loadMap(map: Maps) {
    const newMap = MAPS_CONFIG[map];
    const background = new Sprite({
      ctx: this.ctx,
      position: { x: newMap.offset.x, y: newMap.offset.y },
      imageSrc: newMap.imageSrc,
    });

    // Wipe ctx
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.1)";

    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    cancelAnimationFrame(this.animationId!);

    setTimeout(() => {
      this.background = background;
      this.boundaries = [];
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
    return collisions
      .flatMap((row, y) => {
        return row.map((cell, x) => {
          if (cell === COLLISION) {
            return new Boundary({
              ctx: this.ctx,
              position: {
                x: x * Boundary.width + OFFSET.x,
                y: y * Boundary.height + OFFSET.y,
              },
            });
          }
          return null;
        });
      })
      .filter((x): x is Boundary => x !== null);
  }

  private createDoors(doors: DoorConfig[]) {
    return doors.map((door) => {
      return new Door({
        ctx: this.ctx,
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
