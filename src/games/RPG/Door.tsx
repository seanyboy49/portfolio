import { Maps } from "./maps";
import MovableObject, { IMovableObject } from "./MovableObject";
import { Keys, Position, TILE_WIDTH } from "./types";

interface IDoor extends IMovableObject {
  map: Maps;
  entryDirection: Keys;
  span?: {
    width: number;
    height: number;
  };
}

/**
 * A special object that represents a door to another level.
 * It holds the config for the map it leads to.
 * Doors can be entered from multiple directions, so entryDirection is specified.
 * They can also span multiple blocks, so span is an optional attribute
 */
class Door extends MovableObject {
  map: Maps;
  entryDirection: Keys;

  constructor(props: IDoor) {
    super(props);
    const {
      zoomScale,
      map,
      entryDirection,
      span = {
        width: 1,
        height: 1,
      },
    } = props;

    // this.ctx = ctx;
    // this.position = position;
    this.width = TILE_WIDTH * span.width * zoomScale; // Each map has a different zoom scale, so it must be applied to the width/height
    this.height = TILE_WIDTH * span.height * zoomScale;

    this.entryDirection = entryDirection;
    this.map = map;
    this.color = `rgba(0, 26, 255, 0.5)`;
  }
}

export default Door;
