import MovableObject, { IMovableObject } from "./MovableObject";

class Boundary extends MovableObject {
  constructor(props: IMovableObject) {
    super(props);
    this.color = `rgba(255, 0, 0, 0.5)`;
  }
}

export default Boundary;
