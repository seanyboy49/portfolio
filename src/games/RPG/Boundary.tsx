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
    // this.position.x = position.x
    // this.position.y = position.y
    this.color = `rgba(255, 0, 0, 0.5)`;
  }

  private createDimensions(ID: IDs, zoomScale: number) {
    let dimensions = {
      width: (TILE_WIDTH) * zoomScale,
      height: (TILE_WIDTH) * zoomScale
    }
    

    // Each map has a different zoom scale, so it must be applied to the width/height
    if (ID === IDs.LEFT || ID === IDs.RIGHT) {
      dimensions.width = (TILE_WIDTH / 2) * zoomScale
    }

    return dimensions
  }

  private createPosition(ID:IDs, zoomScale: number, position: Position) {
    if (ID === IDs.RIGHT) {
      position.x = position.x + ((TILE_WIDTH  / 2) * zoomScale)
    }

    return position
    
  }
}

export default Boundary;
