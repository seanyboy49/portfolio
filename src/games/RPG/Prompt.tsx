import { GameMap } from "./types";
import MovableObject, { IMovableObject } from "./MovableObject";
import { TILE_WIDTH } from "./types";

interface IDoor extends IMovableObject {
  title: string;
  content: GameMap.Content[];
  span?: {
    width: number;
    height: number;
  };
}

class Prompt extends MovableObject {
  dialogue: GameMap.Dialogue;

  constructor(props: IDoor) {
    super(props);
    const {
      zoomScale,
      content,
      span = {
        width: 1,
        height: 1,
      },
      title,
    } = props;

    this.width = TILE_WIDTH * span.width * zoomScale; // Each map has a different zoom scale, so it must be applied to the width/height
    this.height = TILE_WIDTH * span.height * zoomScale;

    this.dialogue = {
      title,
      content,
    };

    this.color = `rgba(255, 255, 255, 0.5)`;
  }
}

export default Prompt;
