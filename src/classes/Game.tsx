import Sprite from "./Sprite";

interface IGame {
  ctx: CanvasRenderingContext2D;
  background: Sprite;
  player: Sprite;
}

class Game {
  ctx: CanvasRenderingContext2D;
  background: Sprite;
  player: Sprite;

  constructor({ ctx, background, player }: IGame) {
    this.ctx = ctx;
    this.background = background;
    this.player = player;
  }

  draw() {
    this.background.draw();
    this.player.draw();
  }
}

// ctx
// background
// foreground
// collisions
// player
// sprites
// animation loop

export default Game;
