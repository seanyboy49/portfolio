import { useCallback } from "react";
import Player from "../games/SpaceShooter/Player";
import SpaceShooterGame from "../games/SpaceShooter/SpaceShooterGame";
import useCanvas from "../hooks/useCanvas";

const SpaceShooterGameBoard = () => {
  const setUpGame = useCallback((ctx: CanvasRenderingContext2D) => {
    const x = ctx.canvas.width / 2;
    const y = ctx.canvas.height / 2;

    const player = new Player({ ctx, x, y, radius: 10, color: "white" });
    const game = new SpaceShooterGame({ ctx, player });

    return game;
  }, []);

  const canvas = useCanvas({ setUpGame });

  return <canvas ref={canvas} />;
};

export default SpaceShooterGameBoard;
