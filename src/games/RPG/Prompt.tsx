import MovableObject, { IMovableObject } from "./MovableObject";
import { TILE_WIDTH } from "./types";

interface IDoor extends IMovableObject {
  content: string;
  span?: {
    width: number;
    height: number;
  };
}

class Prompt extends MovableObject {
  content: string

  constructor(props: IDoor) {
    super(props);
    const {
      zoomScale,
      content,
      span = {
        width: 1,
        height: 1,
      },
    } = props;

    this.width = TILE_WIDTH * span.width * zoomScale; // Each map has a different zoom scale, so it must be applied to the width/height
    this.height = TILE_WIDTH * span.height * zoomScale;

    this.content = content;
    this.color = `rgba(0, 26, 255, 0.5)`;
  }
}

export default Prompt;
