import { useEffect, useRef } from "react";
import { CanvasGame } from "../games/types";
// import Game from "../games/Game";

export type Draw = (context: CanvasRenderingContext2D) => void;
export type SetUpGame = (context: CanvasRenderingContext2D) => CanvasGame;
interface IUseCanvas {
  setUpGame: SetUpGame;
  dimensions?: {
    width: number;
    height: number;
  };
}

// Map dimensions
// width: 70
// height: 40
// tiles: 12x12
const useCanvas = ({ setUpGame, dimensions }: IUseCanvas) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      // Exit early if there is no context
      if (!context) return;

      let animationFrameId: number;

      // Set up width and height
      canvas.width = dimensions?.width || window.innerWidth;
      canvas.height = dimensions?.height || window.innerHeight;

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
