export type Position = {
  x: number;
  y: number;
};
/** Velocity as which sprites move */
export const VELOCITY = 3 as const;

/** Game assets are created to fit 16x16 */
export const TILE_WIDTH = 16;

export enum Keys {
  W = "w",
  A = "a",
  S = "s",
  D = "d",
}
export type KeysPressed = {
  [Keys.W]: {
    pressed: boolean;
  };
  [Keys.A]: {
    pressed: boolean;
  };
  [Keys.S]: {
    pressed: boolean;
  };
  [Keys.D]: {
    pressed: boolean;
  };
};

export namespace GameMap {
  export enum MapNames {
    ISLAND = "island",
    MUSEUM = "museum",
    //   HOME = "home",
  }

  export type Map = {
    imageBackgroundSrc: string;
    imageForegroundSrc?: string;
    offset: {
      x: number;
      y: number;
    };

    dimensions: {
      width: number;
      height: number;
    };
    doors: Door[];
    prompts?: Prompt[];
    animations?: AutoPlayAnimation[];
    zoomScale: number;
    collisions: number[];
  };

  export type Maps = {
    [key in MapNames]: Map;
  };

  export type AutoPlayAnimation = {
    position: Position;
    frames: {
      total: number;
      rate: number;
    };
    spriteSheetSrc: string;
  };

  export type Door = {
    map: MapNames;
    /**
     * Matrix Coordinates in collisionMap
     */
    position: {
      x: number;
      y: number;
    };
    entryDirection: Keys;
    span?: {
      width: number;
      height: number;
    };
  };
  export type Content = string | React.FunctionComponent;
  export type Dialogue = {
    title: string;
    content: Content[];
  };
  export type Prompt = {
    title: string;
    content: Content[];
    /**
     * Matrix Coordinates in collisionMap
     */
    position: {
      x: number;
      y: number;
    };
    span?: {
      width: number;
      height: number;
    };
  };
}
