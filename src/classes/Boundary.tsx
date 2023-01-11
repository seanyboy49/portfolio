import { Position } from "./types";

interface IBoundary {
  ctx: CanvasRenderingContext2D;
  position: Position;
}

class Boundary {
  ctx: CanvasRenderingContext2D;
  position: Position;
  width: number;
  height: number;

  static width = 48;
  static height = 48;

  constructor({ position, ctx }: IBoundary) {
    this.position = position;
    this.width = 48;
    this.height = 48;
    this.ctx = ctx;
  }

  draw() {
    const { x, y } = this.position;
    this.ctx.fillStyle = `rgba(255, 0, 0, 0)`;
    this.ctx.fillRect(x, y, this.width, this.height);
  }
}

export default Boundary;
