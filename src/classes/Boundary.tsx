import { Keys, KeysPressed } from "../hooks/useKeyboardInput";
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

  handleKeyboardInput(key: KeysPressed) {
    if (key[Keys.W].pressed) {
      this.position.y += VELOCITY;
    } else if (key[Keys.S].pressed) {
      this.position.y -= VELOCITY;
    } else if (key[Keys.A].pressed) {
      this.position.x += VELOCITY;
    } else if (key[Keys.D].pressed) {
      this.position.x -= VELOCITY;
    }
  }
}

export default Boundary;
