import Player from "./Player";

interface ISpaceShooterGame {
  ctx: CanvasRenderingContext2D;
  player: Player;
}
class SpaceShooterGame {
  ctx: CanvasRenderingContext2D;
  player: Player;

  constructor({ ctx, player }: ISpaceShooterGame) {
    this.ctx = ctx;
    this.player = player;
  }

  draw() {
    // Add a slight blur to projectiles with opacity trick
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    this.player.draw();
  }
}

export default SpaceShooterGame;
