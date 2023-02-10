import { KeysPressed, Keys } from "../games/RPG/types";

export type Rectangle = {
  position: {
    x: number;
    y: number;
  };
  width: number;
  height: number;
};

/**
 * Standard rectungular collision detection algorithm
 * @see https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
 */
export function rectangularCollision(
  rectangle1: Rectangle,
  rectangle2: Rectangle
) {
  return (
    rectangle1.position.x + rectangle1.width >= rectangle2.position.x && // rect1 right hits rect2 left
    rectangle1.position.x <= rectangle2.position.x + rectangle2.width && // rect1 left hits rect2 right
    rectangle1.position.y <= rectangle2.position.y + rectangle2.height && // rect1 top hits rect2 bottom
    rectangle1.position.y + rectangle1.height >= rectangle2.position.y // rect2 bottom hits rect2 top
  );
}

export function rectangularDoorCollision(
  rectangle1: Rectangle,
  rectangle2: Rectangle,
  collisionDirection?: Keys
) {
  if (!collisionDirection) return false;

  if (collisionDirection === Keys.W) {
    return (
      rectangle1.position.x + rectangle1.width <=
        rectangle2.position.x + rectangle2.width && // rect1 right is inside rect2 riht
      rectangle1.position.x >= rectangle2.position.x && // rect1 left is inside rect2 left
      rectangle1.position.y <= rectangle2.position.y // rect1 top hits rect2 top
      // rectangle1.position.y + rectangle1.height >= rectangle2.position.y // rect2 bottom hits rect2 top
    );
  }
  if (collisionDirection === Keys.S) {
    return (
      rectangle1.position.x + rectangle1.width <=
        rectangle2.position.x + rectangle2.width && // rect1 right is inside rect2 riht
      rectangle1.position.x >= rectangle2.position.x && // rect1 left is inside rect2 left
      rectangle1.position.y + rectangle1.height >=
        rectangle2.position.y + rectangle2.height // rect1 bottom hits rect2 bottom
      // rectangle1.position.y + rectangle1.height >= rectangle2.position.y // rect2 bottom hits rect2 top
    );
  }
}

const COLLISION_PADDING = 3 as const;
/**
 * Pad the rectangle so that a player doesn't get stuck against a collision block after a collision is detected
 * Adding some padding on the side of the rectangle in which the player is moving ensures the player's bounding box
 * doesn't actually overlap with the collision block, which can make the player stuck.
 * In other words, we're detecting the collision slightly BEFORE it actually happens
 *
 */
export function padRectangle(rectangle: Rectangle, keyEvents: KeysPressed) {
  const paddedRectangle = {
    ...rectangle,
  };

  if (keyEvents[Keys.W].pressed) {
    return {
      ...rectangle,
      position: {
        x: rectangle.position.x,
        y: rectangle.position.y + COLLISION_PADDING,
      },
    };
  }

  if (keyEvents[Keys.S].pressed) {
    return {
      ...rectangle,
      position: {
        x: rectangle.position.x,
        y: rectangle.position.y - COLLISION_PADDING,
      },
    };
  }

  if (keyEvents[Keys.A].pressed) {
    return {
      ...rectangle,
      position: {
        x: rectangle.position.x + COLLISION_PADDING,
        y: rectangle.position.y,
      },
    };
  }

  if (keyEvents[Keys.D].pressed) {
    return {
      ...rectangle,
      position: {
        x: rectangle.position.x - COLLISION_PADDING,
        y: rectangle.position.y,
      },
    };
  }

  return paddedRectangle;
}
