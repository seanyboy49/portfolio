import { useEffect, useRef } from "react";
import Game from "../classes/Game";

export type Draw = (context: CanvasRenderingContext2D) => void;
export type SetUpGame = (context: CanvasRenderingContext2D) => Game;

// Map dimensions
// width: 70
// height: 40
// tiles: 12x12
const useCanvas = (setUpGame: SetUpGame) => {
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

      const game = setUpGame(context);

      // Animation loop
      const tick = () => {
        game.draw();
        animationFrameId = requestAnimationFrame(tick);
      };

      tick();

      return () => {
        cancelAnimationFrame(animationFrameId);
      };
    }
  }, [setUpGame]);

  return canvasRef;
};

export default useCanvas;
