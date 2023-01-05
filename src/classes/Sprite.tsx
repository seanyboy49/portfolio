type Position = {
  x: number;
  y: number;
};
class Sprite {
  position: Position;
  image: HTMLImageElement;
  ctx: CanvasRenderingContext2D;

  constructor(
    ctx: CanvasRenderingContext2D,
    position: Position,
    imageSrc: string
  ) {
    this.position = position;
    this.image = new Image();

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

    this.ctx.drawImage(
      this.image, // image
      0, // x of source to begin cropping * image. width to shift crop over to next character in sprite sheet
      0, // y of source to begin cropping
      this.image.width, // source width
      this.image.height, // source height
      this.position.x, // x on canvas to place image
      this.position.y, // y on canvas to place image
      this.image.width, // width of image
      this.image.height // heigth of image
    );
  }
}

export default Sprite;
