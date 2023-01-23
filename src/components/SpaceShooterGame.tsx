import { useCallback } from "react";
import styled from "styled-components";
import Player from "../games/SpaceShooter/Player";
import SpaceShooterGame, {
  SpaceShooterGameReactState,
  UpdateGameState,
} from "../games/SpaceShooter/SpaceShooterGame";
import useCanvas from "../hooks/useCanvas";

const GameUI = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
`;
const Score = styled.div`
  color: white;
`;

const GameModal = styled.div`
  display: flex;
  margin: auto;
  background: white;
  width: 30%;
  height: 10%;
  justify-content: center;
  padding: 2rem;
`;
const StartButton = styled.button`
  background-color: lightblue;
  border-radius: 5%;
  padding: 5px 45px;
`;

const SpaceShooterGameBoard = () => {
  const setUpGame = useCallback(
    (ctx: CanvasRenderingContext2D, setGameState: UpdateGameState) => {
      const x = ctx.canvas.width / 2;
      const y = ctx.canvas.height / 2;

      const player = new Player({ ctx, x, y, radius: 10, color: "white" });
      const game = new SpaceShooterGame({
        ctx,
        player,
        updateGameState: setGameState,
      });

      return game;
    },
    []
  );

  const { canvasRef, gameState, startGame } = useCanvas({
    setUpGame,
    initialState: {
      score: 0,
      isPlaying: false,
    },
  });

  console.log(gameState);

  return (
    <>
      <GameUI>
        <Score>Score: {gameState.score}</Score>
        {!gameState.isPlaying && (
          <GameModal>
            <StartButton onClick={startGame}>Start Game</StartButton>
          </GameModal>
        )}
      </GameUI>
      <canvas ref={canvasRef} />
    </>
  );
};

export default SpaceShooterGameBoard;
