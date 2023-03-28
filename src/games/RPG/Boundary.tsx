import { COLLISION_IDS } from "./collisions";
import MovableObject, { IMovableObject } from "./MovableObject";
import { Position, TILE_WIDTH } from "./types";

export interface IBoundary extends IMovableObject{
  ID: COLLISION_IDS
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

  /**
   * Boundaries can take different shapes so we calculate those shapes based on the Collision Boundary ID.
   * zoomScale must be applied because different maps have different zoom scales
   */
  private createDimensions(ID: COLLISION_IDS, zoomScale: number) {
    let dimensions = {
      width: (TILE_WIDTH) * zoomScale,
      height: (TILE_WIDTH) * zoomScale
    }
    
    // Each map has a different zoom scale, so it must be applied to the width/height
    if (ID === COLLISION_IDS.LEFT || ID === COLLISION_IDS.RIGHT || ID === COLLISION_IDS.VERTICAL_CENTER) {
      dimensions.width = (TILE_WIDTH / 2) * zoomScale
    }

    if (ID === COLLISION_IDS.TOP || ID === COLLISION_IDS.BOTTOM || ID === COLLISION_IDS.HORIZONTAL_CENTER) {
      dimensions.height = (TILE_WIDTH / 2) * zoomScale
    }

    return dimensions
  }

  /**
   * Depending on the Boundary shape, the Boundary position must be offset by a certain amount so 
   * that it is drawn in the correct position. 
   */
  private createPosition(ID:COLLISION_IDS, zoomScale: number, _position: Position) {
    let position = { ..._position }

    if (ID === COLLISION_IDS.RIGHT) {
      position.x = position.x + ((TILE_WIDTH  / 2) * zoomScale)
    }
    if (ID === COLLISION_IDS.BOTTOM) {
      position.y = position.y + ((TILE_WIDTH  / 2) * zoomScale)
    }
    if (ID === COLLISION_IDS.HORIZONTAL_CENTER) {
      position.y = position.y + ((TILE_WIDTH  / 4) * zoomScale)
    }
    if (ID === COLLISION_IDS.VERTICAL_CENTER) {
      position.x = position.x + ((TILE_WIDTH  / 4) * zoomScale)
    }

    return position
  }
}

export default Boundary;
