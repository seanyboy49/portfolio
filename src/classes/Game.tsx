import { MAP_DIMENSIONS, OFFSET } from "../App";
import collisions from "../data/collisions";
import Boundary from "./Boundary";
import Sprite from "./Sprite";

export enum Keys {
  W = "w",
  A = "a",
  S = "s",
  D = "d",
}
export type KeysPressed = {
  [Keys.W]: {
    pressed: boolean;
  };
  [Keys.A]: {
    pressed: boolean;
  };
  [Keys.S]: {
    pressed: boolean;
  };
  [Keys.D]: {
    pressed: boolean;
  };
};

type Collisions = number[][];
interface IGame {
  ctx: CanvasRenderingContext2D;
  background: Sprite;
  player: Sprite;
  collisions: Collisions;
}

class Game {
  ctx: CanvasRenderingContext2D;
  background: Sprite;
  player: Sprite;
  keyEvents: KeysPressed;
  boundaries: Array<Boundary>;
  collisionDirection?: Keys;

  constructor({ ctx, background, player, collisions }: IGame) {
    this.ctx = ctx;
    this.background = background;
    this.player = player;
    // this.moving = true; // If the player is moving, then animate player/background/boundaries/etc
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

    // console.log("this.boundaries", this.boundaries);
    // Register event listeners
    window.addEventListener("keydown", this.handleKeyDown.bind(this));
    window.addEventListener("keyup", this.handleKeyUp.bind(this));
  }

  draw() {
    this.background.draw();
    this.player.draw();
    this.boundaries.forEach((b) => b && b.draw());

    this.collisionDirection = undefined;

    // Handle keyboard invput
    this.player.handleKeyboardInput(this.keyEvents);

    this.handleCollisions(this.keyEvents);

    console.log("collisionDirection", this.collisionDirection);
    this.background.handleKeyboardInput(
      this.keyEvents,
      this.collisionDirection
    );
    this.boundaries.forEach(
      (b) => b && b.handleKeyboardInput(this.keyEvents, this.collisionDirection)
    );
  }

  // problem
  // after hitting top boundary, player cannot move in any direction
  // because handleCollisions is still detecting a collision
  // so even if you press down, you still have a collision
  // and then in sprite.handleKeyboardInput

  handleCollisions(keyEvents: KeysPressed) {
    const isKeyPressed = Object.values(this.keyEvents).some(
      (x) => x.pressed === true
    );
    if (!isKeyPressed) return;
    console.log("this.handleCollisions");

    for (let i = 0; i <= this.boundaries.length - 1; i++) {
      const boundary = this.boundaries[i];

      const boundary_ = {
        ...boundary,
      };

      if (keyEvents[Keys.W].pressed) {
        boundary_.position = {
          x: boundary.position.x,
          y: boundary.position.y + 3,
        };
      } else if (keyEvents[Keys.S].pressed) {
        boundary_.position = {
          x: boundary.position.x,
          y: boundary.position.y - 3,
        };
      } else if (keyEvents[Keys.A].pressed) {
        boundary_.position = {
          x: boundary.position.x + 3,
          y: boundary.position.y,
        };
      } else if (keyEvents[Keys.D].pressed) {
        boundary_.position = {
          x: boundary.position.x - 3,
          y: boundary.position.y,
        };
      }

      if (rectangularCollision(this.player as Rectangle, boundary_)) {
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

  handleKeyDown(event: KeyboardEvent) {
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

  handleKeyUp(event: KeyboardEvent) {
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

type Rectangle = {
  position: {
    x: number;
    y: number;
  };
  width: number;
  height: number;
};
function rectangularCollision(rectangle1: Rectangle, rectangle2: Rectangle) {
  // console.log("rectangle1", rectangle1.position);
  // console.log("rectangle2", rectangle2);
  return (
    rectangle1.position.x + rectangle1.width >= rectangle2.position.x && // rect1 right hits rect2 left
    rectangle1.position.x <= rectangle2.position.x + rectangle2.width && // rect1 left hits rect2 right
    rectangle1.position.y <= rectangle2.position.y + rectangle2.height && // rect1 top hits rect2 bottom
    rectangle1.position.y + rectangle1.height >= rectangle2.position.y // rect2 bottom hits rect2 top
  );
}

export default Game;
