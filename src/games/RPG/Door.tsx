import { IBoundary } from "./Boundary";
import { Maps } from "./maps";
import { Keys, KeysPressed, Position, TILE_WIDTH, VELOCITY } from "./types";

interface IDoor extends IBoundary {
  map: Maps;
}

class Door {
  ctx: CanvasRenderingContext2D;
  position: Position;
  width: number;
  height: number;
  color: string;
  map: Maps;

  constructor({ ctx, position, zoomScale, map }: IDoor) {
    this.ctx = ctx;
    this.position = position;
    this.width = TILE_WIDTH * zoomScale; // Each map has a different zoom scale, so it must be applied to the width/height
    this.height = TILE_WIDTH * zoomScale;

    this.map = map;
    this.color = `rgba(0, 26, 255, 0.5)`;
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

export default Door;

// Doors

// {x: 749, y: 324}
// {x: 1197, y: -124
