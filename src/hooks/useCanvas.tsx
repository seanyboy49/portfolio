import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { CanvasGame } from "../games/types";

export type Draw = (context: CanvasRenderingContext2D) => void;
export type SetUpGame = (
  context: CanvasRenderingContext2D,
  setGameState: Dispatch<SetStateAction<any>>
) => CanvasGame;
interface IUseCanvas {
  /**
   * Connects a canvas game to the React API. Passes canvas context and gameState setter
   * to a canvas game
   */
  setUpGame: SetUpGame;
  /**
   * initialState.isPlaying is required.
   * All other state props are arbitrary
   */
  initialState: {
    isPlaying: boolean;
    [key: string]: any;
  };
  /**
   * If dimensions aren't specified, the canvas will take up full width/height
   */
  dimensions?: {
    width: number;
    height: number;
  };
}

/**
 * A React interface for connecting your Game Class to your canvas.
 */
const useCanvas = ({ setUpGame, dimensions, initialState }: IUseCanvas) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [gameState, setGameState] = useState<typeof initialState>(initialState);

  useEffect(() => {
    if (!gameState.isPlaying) return;

    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      // Exit early if there is no context
      if (!context) return;

      // Set up width and height
      canvas.width = dimensions?.width || window.innerWidth;
      canvas.height = dimensions?.height || window.innerHeight;

      const game = setUpGame(context, setGameState);

      // Initiate the animation loop
      game.draw();

      return () => {
        game.animationId && cancelAnimationFrame(game.animationId);
      };
    }
  }, [setUpGame, dimensions, gameState.isPlaying]);

  const startGame = () =>
    setGameState((prev) => ({
      ...prev,
      isPlaying: !prev.isPlaying,
    }));

  return { canvasRef, gameState, startGame };
};

export default useCanvas;
