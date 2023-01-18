import { useEffect, useRef } from "react";

export type Draw = (context: CanvasRenderingContext2D) => void;
export type SetUpSprites = (
  context: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement
) => void;

// Map dimensions
// width: 70
// height: 40
// tiles: 48x48
const useCanvas = (draw: Draw, setUpSprites: SetUpSprites) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      // Exit early if there is no context
      if (!context) return;

      let animationFrameId: number;

      // Set up width and height
      // 16:9 aspect ratio that should fit any desktop size
      canvas.width = 1024;
      canvas.height = 576;

      setUpSprites(context, canvas);

      // Animation loop
      const tick = () => {
        draw(context);
        animationFrameId = requestAnimationFrame(tick);
      };

      tick();

      return () => {
        cancelAnimationFrame(animationFrameId);
      };
    }
  }, [draw, setUpSprites]);

  return canvasRef;
};

export default useCanvas;
