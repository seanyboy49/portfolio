import { IBoundary } from "./Boundary";
import { Maps } from "./maps";
import { Keys, KeysPressed, Position, TILE_WIDTH, VELOCITY } from "./types";

interface IDoor extends IBoundary {
  map: Maps;
  entryDirection: Keys;
  span?: {
    width: number;
    height: number;
  };
}

class Door {
  ctx: CanvasRenderingContext2D;
  position: Position;
  width: number;
  height: number;
  color: string;
  map: Maps;
  entryDirection: Keys;

  constructor({
    ctx,
    position,
    zoomScale,
    map,
    entryDirection,
    span = {
      width: 1,
      height: 1,
    },
  }: IDoor) {
    this.ctx = ctx;
    this.position = position;
    this.width = TILE_WIDTH * span.width * zoomScale; // Each map has a different zoom scale, so it must be applied to the width/height
    this.height = TILE_WIDTH * span.height * zoomScale;

    this.entryDirection = entryDirection;
    this.map = map;
    this.color = `rgba(0, 26, 255, 0.5)`;
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

export default Door;

// Doors

// {x: 749, y: 324}
// {x: 1197, y: -124
