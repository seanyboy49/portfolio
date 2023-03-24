import { IDs } from "./collisions";
import MovableObject, { IMovableObject } from "./MovableObject";
import { Position, TILE_WIDTH } from "./types";

export interface IBoundary extends IMovableObject{
  ID: IDs
}
class Boundary extends MovableObject {
  constructor(props: IBoundary) {
    super(props);
    const dimensions = this.createDimensions(props.ID, props.zoomScale)
    const position = this.createPosition(props.ID, props.zoomScale, props.position)
    
    this.width = dimensions.width 
    this.height = dimensions.height
    this.position.x = position.x
    this.position.y = position.y
    this.color = `rgba(255, 0, 0, 0.5)`;
  }

  private createDimensions(ID: IDs, zoomScale: number) {
    let dimensions = {
      width: (TILE_WIDTH) * zoomScale,
      height: (TILE_WIDTH) * zoomScale
    }
    
    // Each map has a different zoom scale, so it must be applied to the width/height
    if (ID === IDs.LEFT || ID === IDs.RIGHT || ID === IDs.VERTICAL_CENTER) {
      dimensions.width = (TILE_WIDTH / 2) * zoomScale
    }

    if (ID === IDs.TOP || ID === IDs.BOTTOM || ID === IDs.HORIZONTAL_CENTER) {
      dimensions.height = (TILE_WIDTH / 2) * zoomScale
    }

    return dimensions
  }

  private createPosition(ID:IDs, zoomScale: number, _position: Position) {
    let position = { ..._position }

    if (ID === IDs.RIGHT) {
      position.x = position.x + ((TILE_WIDTH  / 2) * zoomScale)
    }
    if (ID === IDs.BOTTOM) {
      position.y = position.y + ((TILE_WIDTH  / 2) * zoomScale)
    }
    if (ID === IDs.HORIZONTAL_CENTER) {
      position.y = position.y + ((TILE_WIDTH  / 4) * zoomScale)
    }
    if (ID === IDs.VERTICAL_CENTER) {
      position.x = position.x + ((TILE_WIDTH  / 4) * zoomScale)
    }

    return position
  }
}

export default Boundary;
