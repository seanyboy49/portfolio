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
