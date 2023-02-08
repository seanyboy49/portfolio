import Boundary, { IBoundary } from "./Boundary";
import { Maps } from "./maps";

interface IDoor extends IBoundary {
  map: Maps;
}

class Door extends Boundary {
  map: Maps;
  constructor(props: IDoor) {
    super(props);

    this.map = props.map;
    this.color = `rgba(0, 26, 255, 0.5)`;
  }
}

export default Door;

// Doors

// {x: 749, y: 324}
// {x: 1197, y: -124
