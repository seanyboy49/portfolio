import { OFFSET } from "../App";
import { Keys, KeysPressed } from "../hooks/useKeyboardInput";
import Boundary from "./Boundary";
import { Position, VELOCITY } from "./types";

type Frames = {
  total: number; // total number of frames in a sprite sheet
  rate: number; // rate at which to switch frames
  current: number; // the current frame to render
  elapsed: number; // number of frames that have elapsed
};

type SpriteSheets = { [direction: string]: string };

interface ISprite {
  ctx: CanvasRenderingContext2D;
  position: Position;
  imageSrc: string;
  frames?: { total: number; rate: number };
  sprites?: SpriteSheets;
  movable?: boolean;
}
class Sprite {
  ctx: CanvasRenderingContext2D;
  position: Position;
  image: HTMLImageElement;
  sprites?: SpriteSheets;
  frames: Frames;
  width?: number; // the actual width of the sprite after it's been cropped
  height?: number; // the height of the sprite
  movable: boolean; // whether or not the sprite moves with character movement
  animate: boolean;
  velocity: number;

  constructor({
    ctx,
    position,
    imageSrc,
    frames = { total: 1, rate: 10 },
    sprites,
    movable = true,
  }: ISprite) {
    this.ctx = ctx;
    this.position = position;
    this.velocity = VELOCITY;

    this.image = new Image();
    this.image.src = imageSrc;
    // The image src doesn't load immediately, so we specify
    // a function to execute logic when it's done loading
    this.image.onload = () => {
      this.width = this.image.width / this.frames.total;
      this.height = this.image.height;
    };
    this.sprites = sprites;

    this.frames = { ...frames, current: 0, elapsed: 0 };

    this.movable = movable;
    this.animate = false;
  }

  handleKeyboardInput(key: KeysPressed, collisionDirection?: Keys) {
    // If the sprite is movable, then modify its position
    // to move in response to the player
    if (this.movable) {
      if (key[Keys.W].pressed) {
        if (collisionDirection && collisionDirection === Keys.W) return;
        this.position.y += this.velocity;
      } else if (key[Keys.S].pressed) {
        if (collisionDirection && collisionDirection === Keys.S) return;

        this.position.y -= this.velocity;
      } else if (key[Keys.A].pressed) {
        if (collisionDirection && collisionDirection === Keys.A) return;
        this.position.x += this.velocity;
      } else if (key[Keys.D].pressed) {
        if (collisionDirection && collisionDirection === Keys.D) return;
        this.position.x -= this.velocity;
      }
    }
    // Otherwise, modify its image to simulate animation
    else {
      if (key[Keys.W].pressed) {
        this.animate = true;
        this.image.src = this.sprites!.up;
      } else if (key[Keys.S].pressed) {
        this.animate = true;
        this.image.src = this.sprites!.down;
      } else if (key[Keys.A].pressed) {
        this.animate = true;
        this.image.src = this.sprites!.left;
      } else if (key[Keys.D].pressed) {
        this.animate = true;
        this.image.src = this.sprites!.right;
      }
    }
  }

  draw() {
    this.ctx.translate(
      this.position.x + this.image.width / 2,
      this.position.y + this.image.height / 2
    );

    this.ctx.translate(
      -this.position.x - this.image.width / 2,
      -this.position.y - this.image.height / 2
    );

    this.ctx.drawImage(
      this.image, // image
      this.frames.current * this.width!, // x of source to begin cropping * image. width to shift crop over to next character in sprite sheet
      0, // y of source to begin cropping
      this.image.width / this.frames.total, // source width
      this.image.height, // source height
      this.position.x, // x on canvas to place image
      this.position.y, // y on canvas to place image
      this.image.width / this.frames.total, // width of image
      this.image.height // heigth of image
    );

    // Below, we increment frames in order to do math to animate frames
    // of the sprite sheet.
    // If animate=false, then we shouldn't increment frames
    if (!this.animate) return;

    // Increment frames for animation math below
    this.frames.elapsed++;

    // Animate every 10 frames
    if (this.frames.elapsed % this.frames.rate !== 0) return;

    // Move the current frame up
    // We don't want current to actually reach the total, otherwise we'll crop out of bounds
    if (this.frames.current < this.frames.total - 1) {
      this.frames.current++;
    } else {
      // Reset current frame to zero
      this.frames.current = 0;
    }

    // Once this frame of animation is done, animate should be false
    this.animate = false;
  }
}

export default Sprite;

// pass keyboard input to sprites
// movable property
