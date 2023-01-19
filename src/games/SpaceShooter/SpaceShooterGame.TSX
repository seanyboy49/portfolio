import Enemy from "./Enemy";
import Player from "./Player";

interface ISpaceShooterGame {
  ctx: CanvasRenderingContext2D;
  player: Player;
}
class SpaceShooterGame {
  readonly ctx: CanvasRenderingContext2D;
  player: Player;
  enemies: Enemy[];
  readonly CANVAS_CENTER: {
    x: number;
    y: number;
  };

  constructor({ ctx, player }: ISpaceShooterGame) {
    this.ctx = ctx;
    this.player = player;
    this.enemies = [];
    this.CANVAS_CENTER = {
      x: ctx.canvas.width / 2,
      y: ctx.canvas.height / 2,
    };
  }

  public draw() {
    // Add a slight blur to projectiles with opacity trick
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    this.player.draw();

    // animate enemies
    this.enemies.forEach((enemy) => enemy.update());
  }

  private spawnEnemies() {
    setInterval(() => {
      const MIN = 4;
      const MAX = 30;
      // Generates a random number between max and min
      const radius = Math.random() * (MAX - MIN) + MIN;

      const canvas = this.ctx.canvas;

      let x, y;
      // 50/50 chance it generates from the left/right vs top/bottom
      if (Math.random() < 0.5) {
        // From either left or right at a random y
        x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
        y = Math.random() * canvas.height;
      } else {
        // From either top or bottom at a random x
        x = Math.random() * canvas.width;
        y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;

        const color = `hsl(${Math.random() * 360}, 50%, 50%)`;

        const angle = Math.atan2(
          this.CANVAS_CENTER.y - y,
          this.CANVAS_CENTER.x - x
        );

        const velocity = {
          x: Math.cos(angle),
          y: Math.sin(angle),
        };

        const enemy = new Enemy({
          ctx: this.ctx,
          x,
          y,
          radius,
          color,
          velocity,
        });
        this.enemies.push(enemy);
      }
    }, 1000);
  }
}

export default SpaceShooterGame;
