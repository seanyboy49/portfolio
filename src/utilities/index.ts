export type Rectangle = {
  position: {
    x: number;
    y: number;
  };
  width: number;
  height: number;
};

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
