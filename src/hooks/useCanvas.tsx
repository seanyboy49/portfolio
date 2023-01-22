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

const useCanvas = ({ setUpGame, dimensions }: IUseCanvas) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      // Exit early if there is no context
      if (!context) return;

      // Set up width and height
      canvas.width = dimensions?.width || window.innerWidth;
      canvas.height = dimensions?.height || window.innerHeight;

      const game = setUpGame(context);

      // Inititate the animation loop
      game.draw();

      return () => {
        game.animationId && cancelAnimationFrame(game.animationId);
      };
    }
  }, [setUpGame, dimensions]);

  return canvasRef;
};

export default useCanvas;
