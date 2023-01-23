import { Dispatch, SetStateAction } from "react";
import { CanvasGame } from "../types";
import Enemy from "./Enemy";
import Particle from "./Particle";
import Player from "./Player";
import Projectile from "./Projectile";

export type SpaceShooterGameReactState = {
  isPlaying: boolean;
  score: number;
};
export type UpdateGameState = Dispatch<
  SetStateAction<SpaceShooterGameReactState>
>;

interface ISpaceShooterGame {
  ctx: CanvasRenderingContext2D;
  player: Player;
  updateGameState: UpdateGameState;
}
class SpaceShooterGame implements CanvasGame {
  readonly ctx: CanvasRenderingContext2D;
  readonly CANVAS_CENTER: {
    x: number;
    y: number;
  };
  public animationId?: number;
  public score: number = 0;
  public isPlaying: boolean = false;

  player: Player;
  enemies: Enemy[];
  projectiles: Projectile[];
  particles: Particle[];

  updateGameState: UpdateGameState; // Callback that exposes game state to React state in useCanvas

  constructor({ ctx, player, updateGameState }: ISpaceShooterGame) {
    this.ctx = ctx;
    this.player = player;
    this.enemies = [];
    this.projectiles = [];
    this.particles = [];
    this.CANVAS_CENTER = {
      x: ctx.canvas.width / 2,
      y: ctx.canvas.height / 2,
    };
    this.updateGameState = updateGameState;

    // Register event listeners
    // TODO: move this to hook
    window.addEventListener("click", this.handleShoot.bind(this));

    this.spawnEnemies();
  }

  /**
   * The main animation loop. It should be called the first time in useCanvas
   * and will call itself from then on out
   */
  public draw() {
    // You must pass an arrow function to keep the reference to this
    this.animationId = requestAnimationFrame(() => this.draw());

    // Add a slight blur to projectiles with opacity trick
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    this.player.draw();

    // animate projectiles
    this.projectiles.forEach((projectile, projectileIndex) => {
      projectile.update();

      this.handleProjectileOutOfBounds(projectile, projectileIndex);
    });

    // animate particles
    this.particles.forEach((particle, particleIndex) => {
      // Remove particles as their alpha gets smaller
      if (particle.alpha <= 0) {
        this.particles.splice(particleIndex, 0);
      } else {
        particle.update();
      }
    });

    // animate enemies
    this.enemies.forEach((enemy, enemyIndex) => {
      enemy.update();

      this.handleEnemyPlayerCollision(enemy);
      this.handleEnemyProjectileCollision(enemy, enemyIndex);
    });
  }

  private handleShoot(event: MouseEvent) {
    const angle = Math.atan2(
      event.clientY - this.CANVAS_CENTER.y,
      event.clientX - this.CANVAS_CENTER.x
    );
    const SPEED = 3;
    const velocity = {
      x: Math.cos(angle) * SPEED,
      y: Math.sin(angle) * SPEED,
    };

    const projectile = new Projectile({
      ctx: this.ctx,
      x: this.CANVAS_CENTER.x,
      y: this.CANVAS_CENTER.y,
      radius: 5,
      color: "white",
      velocity,
    });

    this.projectiles.push(projectile);
  }

  /**
   * Detect if the projectile has moved past the edge of the screen in each of the 4 directions
   * and removes it from the projectiles array
   */
  private handleProjectileOutOfBounds(
    projectile: Projectile,
    projectileIndex: number
  ) {
    if (
      projectile.x + projectile.radius < 0 || // OOB left
      projectile.x - projectile.radius > this.ctx.canvas.width || // OOB right
      projectile.y + projectile.radius < 0 || // OOB top
      projectile.y - projectile.radius > this.ctx.canvas.height // OOB top
    ) {
      this.projectiles.splice(projectileIndex, 1);
    }
  }

  /**
   * Detect if an enemy hits the player and stops the game
   */
  private handleEnemyPlayerCollision(enemy: Enemy) {
    const distance = Math.hypot(
      this.player.x - enemy.x,
      this.player.y - enemy.y
    );
    const actualDistance = distance - enemy.radius - this.player.radius;
    if (actualDistance >= 1) return;

    // Update State
    this.isPlaying = false;
    this.updateGameState((prev) => ({
      ...prev,
      isPlaying: this.isPlaying,
    }));
    // And cancel the animation
    this.animationId && cancelAnimationFrame(this.animationId);
  }

  /**
   * Detect if a projectile hits an enemy. Creates particle explosions on hit.
   * @todo - Improve this to avoid O(n^2)
   */
  private handleEnemyProjectileCollision(enemy: Enemy, enemyIndex: number) {
    this.projectiles.forEach((projectile, projectileIndex) => {
      const distance = Math.hypot(
        projectile.x - enemy.x,
        projectile.y - enemy.y
      );

      // Account for both enemy and projectile radius when calculating distance
      const actualDistance = distance - enemy.radius - projectile.radius;
      if (actualDistance >= 1) return;

      // Increment score
      this.score += 100;
      this.updateGameState((prev) => ({
        ...prev,
        score: this.score,
      }));

      // Create particles on collision
      for (let i = 0; i <= enemy.radius * 2; i++) {
        const particle = new Particle({
          ctx: this.ctx,
          x: enemy.x,
          y: enemy.y,
          radius: Math.random() * 2,
          color: enemy.color,
          velocity: {
            x: (Math.random() - 0.5) * (Math.random() * 8),
            y: (Math.random() - 0.5) * (Math.random() * 8),
          },
        });

        this.particles.push(particle);
      }

      // Shrink enemies on hit
      if (enemy.radius - 10 > 5) {
        enemy.radius -= 10;
      } else {
        // remove enemies
        this.enemies.splice(enemyIndex, 1);
      }

      // Remove projectile
      this.projectiles.splice(projectileIndex, 1);
    });
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
