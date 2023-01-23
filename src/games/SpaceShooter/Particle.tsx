import { IEnemy as IParticle } from "./Enemy";

class Particle {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  radius: number;
  color: string;
  velocity: { x: number; y: number };
  alpha: number;

  static FRICTION = 0.99;

  constructor({ ctx, x, y, radius, color, velocity }: IParticle) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.alpha = 1;
  }

  draw() {
    // Since alpha is a global value, you have to save the context state and then restore
    // it after modifying it
    this.ctx.save();
    this.ctx.globalAlpha = this.alpha;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.restore();
  }

  update() {
    this.draw();
    this.velocity.x *= Particle.FRICTION; // slow down the partcile over time
    this.velocity.y *= Particle.FRICTION; // slow down the partcile over time
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
    this.alpha -= 0.01;
  }
}

export default Particle;
