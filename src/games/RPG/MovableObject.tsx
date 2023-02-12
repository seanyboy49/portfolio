import { Keys, KeysPressed } from "./types";
import { Position, VELOCITY, TILE_WIDTH } from "./types";

export interface IMovableObject {
  ctx: CanvasRenderingContext2D;
  position: Position;
  zoomScale: number;
}

/**
 * Base class for movable objects like Boundary, Door and Dialogue Prompts
 */
class MovableObject {
  ctx: CanvasRenderingContext2D;
  position: Position;
  width: number;
  height: number;
  color: string;

  constructor({ position, ctx, zoomScale }: IMovableObject) {
    this.position = position;
    this.width = TILE_WIDTH * zoomScale; // Each map has a different zoom scale, so it must be applied to the width/height
    this.height = TILE_WIDTH * zoomScale;
    this.ctx = ctx;
    this.color = `rgba(255, 0, 0, 0.5)`;
  }

  draw() {
    const { x, y } = this.position;
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(x, y, this.width, this.height);
  }

  handleKeyboardInput(key: KeysPressed, collisionDirection?: Keys) {
    if (collisionDirection) return;
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

export default MovableObject;
