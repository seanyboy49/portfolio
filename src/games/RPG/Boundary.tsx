import MovableObject, { IMovableObject } from "./MovableObject";
import { Keys, KeysPressed } from "./types";
import { Position, VELOCITY, TILE_WIDTH } from "./types";

class Boundary extends MovableObject {
  constructor(props: IMovableObject) {
    super(props);
    this.color = `rgba(255, 0, 0, 0.5)`;
  }
}

export default Boundary;
