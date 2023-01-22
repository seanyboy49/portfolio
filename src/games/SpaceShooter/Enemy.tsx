export interface IEnemy {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  radius: number;
  color: string;
  velocity: { x: number; y: number };
}

class Enemy {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  radius: number;
  color: string;
  velocity: { x: number; y: number };

  constructor({ ctx, x, y, radius, color, velocity }: IEnemy) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }

  update() {
    this.draw();
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
  }
}

export default Enemy;
