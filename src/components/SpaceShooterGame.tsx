import { useCallback } from "react";
import styled, { css } from "styled-components";
import Player from "../games/SpaceShooter/Player";
import SpaceShooterGame, {
  UpdateGameState,
} from "../games/SpaceShooter/SpaceShooterGame";
import useCanvas from "../hooks/useCanvas";
import { GameUI } from "./styled";

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Score = styled.div`
  color: white;
`;

const GameModal = styled.div`
  margin: auto;
  background: white;
  border: 1px lightgray solid;
  border-radius: 5px;
  width: 30%;
  justify-content: center;
  text-align: center;
  padding: 2rem;
`;

const primary = "#3949ab";
interface IStyledButton {
  variant?: "primary" | "secondary";
}
const StyledButton = styled.button`
  ${(props: IStyledButton) => {
    if (props.variant === "secondary") {
      return css`
        background-color: white;
        color: black;
        border: 1px black solid;
      `;
    }
    return css`
      background-color: ${primary};
      color: white;
      border: none;
    `;
  }}
  border-radius: 10px;
  padding: 5px 45px;
  height: 3rem;
  margin: 0.2rem;
  font-size: 1rem;
`;

const Text = styled.p`
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

interface ISpaceShooterGameBoard {
  handleBack: () => void;
}

const SpaceShooterGameBoard = ({ handleBack }: ISpaceShooterGameBoard) => {
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

  const { canvasRef, gameState, updateGameState } = useCanvas({
    setUpGame,
    initialState: {
      score: 0,
      isPlaying: false,
    },
  });

  const startGame = () => {
    updateGameState({ isPlaying: true, score: 0 });
  };

  return (
    <>
      <GameUI>
        <Score>Score: {gameState.score}</Score>
        {!gameState.isPlaying && (
          <GameModal>
            <Text>Use your mouse to shoot the meteors!</Text>
            <FlexContainer>
              <StyledButton onClick={startGame}>Start Game</StyledButton>
              <StyledButton variant="secondary" onClick={handleBack}>
                Go Back
              </StyledButton>
            </FlexContainer>
          </GameModal>
        )}
      </GameUI>
      <canvas ref={canvasRef} />
    </>
  );
};

export default SpaceShooterGameBoard;
