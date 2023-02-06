export type Position = {
  x: number;
  y: number;
};
/** Velocity as which sprites move */
export const VELOCITY = 3 as const;

/** Game assets are created to fit 16x16 */
export const TILE_WIDTH = 16;

/** Amount of offset rendering of the map from top left hand corner*/
export const OFFSET = {
  x: -735,
  y: -650,
} as const;

/** Width/Height of map in tiles.
 *  16:9 aspect ratio that should fit any desktop size
 */
export const MAP_DIMENSIONS = {
  width: 70,
  height: 40,
} as const;

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
