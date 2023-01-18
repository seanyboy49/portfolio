import { OFFSET } from "../App";
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
  boundaries: Boundary[];

  constructor({ ctx, background, player, collisions }: IGame) {
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
    window.addEventListener("keydown", this.handleKeyDown.bind(this));
    window.addEventListener("keyup", this.handleKeyUp.bind(this));
  }

  draw() {
    this.background.draw();
    this.player.draw();
    this.boundaries.forEach((b) => b.draw());

    // Handle keyboard invput
    this.background.handleKeyboardInput(this.keyEvents);
    this.player.handleKeyboardInput(this.keyEvents);
    this.boundaries.forEach((b) => b.handleKeyboardInput(this.keyEvents));
  }

  handleCollisions() {}

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

export default Game;
