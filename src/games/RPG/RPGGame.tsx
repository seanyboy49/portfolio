import { OFFSET } from "../../components/RPGGameBoard";
import { padRectangle, Rectangle, rectangularCollision } from "../../utilities";
import { CanvasGame, EventHandler } from "../types";
import Boundary from "./Boundary";
import Sprite from "./Sprite";
import { Keys, KeysPressed } from "./types";
import { Events } from "../types";

type Collisions = number[][];
interface IRPGGame {
  ctx: CanvasRenderingContext2D;
  background: Sprite;
  player: Sprite;
  collisions: Collisions;
}

class RPGGame implements CanvasGame {
  ctx: CanvasRenderingContext2D;
  background: Sprite;
  player: Sprite;
  keyEvents: KeysPressed; // A map of which key(s) are currently being pressed
  boundaries: Array<Boundary>; // An array of Boundaries that cause collisions
  collisionDirection?: Keys; // The direction the player was moving when colliding
  isPlaying = true;
  eventListeners: EventHandler[];

  public animationId?: number;

  constructor({ ctx, background, player, collisions }: IRPGGame) {
    this.ctx = ctx;
    this.background = background;
    this.player = player;

    this.boundaries = this.createBoundariesFromCollisions(collisions);
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

    // Handle collision detection
    // Initialize to undefined because it should only be defined when a collision is detected
    this.collisionDirection = undefined;
    this.handleCollisions(this.keyEvents);

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
  }

  private handleCollisions(keyEvents: KeysPressed) {
    const isKeyPressed = Object.values(keyEvents).some(
      (x) => x.pressed === true
    );
    if (!isKeyPressed) return;

    for (let i = 0; i <= this.boundaries.length - 1; i++) {
      const boundary = padRectangle(this.boundaries[i], keyEvents);

      // If there is a collision, set the collision direction
      if (rectangularCollision(this.player as Rectangle, boundary)) {
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
    // Broad phase
    // Find approximately where on the boundaries map the player's position is
    // const x_ = Math.ceil(
    //   (this.player.position.x + this.player.width!) / Boundary.width +
    //     Math.abs(this.background.position.x / Boundary.width)
    // );
    // const y_ = Math.ceil(
    //   (this.player.position.y + this.player.height!) / Boundary.width +
    //     Math.abs(this.background.position.y / Boundary.width)
    // );
    // console.log("x_", x_); // 27
    // console.log("y_", y_); // 21

    // console.log("x_", x_);
    // console.log("y_", y_);

    // const boundariesIndex = x_ * MAP_DIMENSIONS.width + (y_ + 1);
    // const boundary = this.boundaries[boundariesIndex];
    // if (boundary) {
    //   // console.log("boundary", boundary);
    //   boundary.color = `rgba(50, 0, 0, 1)`;
    // }

    // const broadPhaseBoundaries = [];
    // const OFFSET = 5;
    // for (
    //   let x = boundariesIndex - MAP_DIMENSIONS.width * OFFSET;
    //   x <= boundariesIndex + MAP_DIMENSIONS.width * OFFSET;
    //   x += MAP_DIMENSIONS.width
    // ) {
    //   for (let y = x + y_ - OFFSET; y <= x + y_ + OFFSET; y++) {
    //     // console.log("y", y);
    //     // broadPhaseBoundaries.push(this.boundaries[y]);
    //   }
    // }

    // console.log("broadPhaseBoundaries", broadPhaseBoundaries);

    // Narrow phase detection

    // console.log("boundariesIndex", boundariesIndex);
    // Detect for boundaries
    // for (let i = 0; i <= broadPhaseBoundaries.length - 1; i++) {
    //   const boundary = broadPhaseBoundaries[i];
    //   // console.log("boundary", boundary);

    //   if (boundary) {
    //     boundary.color = `rgba(20, 0, 0, 0.9)`;
    //     // console.log(boundary);
    //     // @ts-ignore
    //     const collision = rectangularCollision(this.player, boundary);
    //     // console.log("collision", collision);
    //     if (collision) {
    //       console.log("collision");
    //     }
    //   }
    // }

    // if (
    //   rectangularCollision(
    //     this.player,
    //      {
    //       ...boundary,
    //       position: { x: boundary.position.x, y: boundary.position.y + 3 },
    //     },
    //   }

    // x=26 y = 20
    // console.log("x", x_);
    // console.log("y", y_);
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
          if (cell === 1025) {
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
      .filter((v): v is Boundary => v !== null);
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
