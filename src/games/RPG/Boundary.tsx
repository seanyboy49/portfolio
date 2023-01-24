import { Keys, KeysPressed } from "../RPG/types";
import { Position, VELOCITY } from "./types";

interface IBoundary {
  ctx: CanvasRenderingContext2D;
  position: Position;
}

class Boundary {
  ctx: CanvasRenderingContext2D;
  position: Position;
  width: number;
  height: number;
  color: string;

  static width = 48;
  static height = 48;

  constructor({ position, ctx }: IBoundary) {
    this.position = position;
    this.width = 12 * 4;
    this.height = 12 * 4;
    this.ctx = ctx;
    this.color = `rgba(255, 0, 0, 0.5)`;
  }

  draw() {
    const { x, y } = this.position;
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(x, y, this.width, this.height);
  }

  handleKeyboardInput(key: KeysPressed, collisionDirection?: Keys) {
    if (key[Keys.W].pressed) {
      if (collisionDirection && collisionDirection === Keys.W) return;

      this.position.y += VELOCITY;
    } else if (key[Keys.S].pressed) {
      if (collisionDirection && collisionDirection === Keys.S) return;
      this.position.y -= VELOCITY;
    } else if (key[Keys.A].pressed) {
      if (collisionDirection && collisionDirection === Keys.A) return;
      this.position.x += VELOCITY;
    } else if (key[Keys.D].pressed) {
      if (collisionDirection && collisionDirection === Keys.D) return;
      this.position.x -= VELOCITY;
    }
  }
}

export default Boundary;
