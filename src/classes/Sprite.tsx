type Position = {
  x: number;
  y: number;
};

type Frames = {
  total: number; // total number of frames in a sprite sheet
  rate: number; // rate at which to switch frames
  current: number; // the current frame to render
  elapsed: number; // number of frames that have elapsed
};
class Sprite {
  position: Position;
  image: HTMLImageElement;
  ctx: CanvasRenderingContext2D;
  frames: Frames;

  static Velocity = 3;

  constructor(
    ctx: CanvasRenderingContext2D,
    position: Position,
    imageSrc: string,
    frames = { total: 1, rate: 10 }
  ) {
    this.position = position;
    this.image = new Image();
    this.frames = { ...frames, current: 0, elapsed: 0 };

    // this.image.onload = () => {
    //     this.width =
    // }

    this.image.src = imageSrc;
    this.ctx = ctx;
  }

  draw() {
    // this.ctx.translate(
    //   this.position.x + this.image.width / 2,
    //   this.position.y + this.image.height / 2
    // );

    // this.ctx.translate(
    //   -this.position.x - this.image.width / 2,
    //   -this.position.y - this.image.height / 2
    //  )

    this.frames.elapsed++;
    console.log("image", this.image.width);

    this.ctx.drawImage(
      this.image, // image
      this.frames.current * (this.image.width / this.frames.total), // x of source to begin cropping * image. width to shift crop over to next character in sprite sheet
      0, // y of source to begin cropping
      this.image.width / this.frames.total, // source width
      this.image.height, // source height
      this.position.x, // x on canvas to place image
      this.position.y, // y on canvas to place image
      this.image.width / this.frames.total, // width of image
      this.image.height // heigth of image
    );

    // Animate every 10 frames
    if (this.frames.elapsed % this.frames.rate === 0) {
      // Move the current frame up
      if (this.frames.current < this.frames.total - 1) {
        this.frames.current++;
      } else {
        // Reset current frame to zero
        this.frames.current = 0;
      }
    }
  }
}

export default Sprite;

// pass keyboard input to sprites
// movable property
