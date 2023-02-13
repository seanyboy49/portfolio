import { Dispatch, SetStateAction, useCallback, useState } from "react";

import playerUpSrc from "../images/RPG/player-up.png";
import playerDownSrc from "../images/RPG/player-down.png";
import playerRightSrc from "../images/RPG/player-right.png";
import playerLeftSrc from "../images/RPG/player-left.png";

import Sprite from "../games/RPG/Sprite";
import RPGGame from "../games/RPG/RPGGame";
import useCanvas from "../hooks/useCanvas";
import PortfolioMenuUI from "./PortfolioMenuUI";
import { MAPS_CONFIG, Maps } from "../games/RPG/maps";
import RPGDialogueUI from "./RPGDialogueUI";

const RPGGameBoard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const setUpGame = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      setGameState: Dispatch<SetStateAction<any>>
    ) => {
      const player = new Sprite({
        ctx: ctx,
        position: { x: ctx.canvas.width / 2, y: ctx.canvas.height / 2 },
        imageSrc: playerDownSrc,
        frames: { total: 4, rate: 10 },
        sprites: {
          up: playerUpSrc,
          down: playerDownSrc,
          left: playerLeftSrc,
          right: playerRightSrc,
        },
        movable: false,
      });

      const game = new RPGGame({
        ctx,
        player,
        map: Maps.MUSEUM,
        mapsConfig: MAPS_CONFIG,
        updateGameState: setGameState,
      });

      return game;
    },
    []
  );

  const { canvasRef, gameState } = useCanvas({
    setUpGame,
    initialState: {
      isPlaying: true,
    },
  });

  const toggleMenuOpen = useCallback(() => {
    setIsMenuOpen((isMenuOpen) => !isMenuOpen);
  }, []);

  console.log("gameState", gameState);
  return (
    <>
      <PortfolioMenuUI isOpen={isMenuOpen} toggleMenuOpen={toggleMenuOpen} />
      {/* <RPGDialogueUI
        content={gameState.content}
        showContent={gameState.showContent}
      /> */}
      <RPGDialogueUI content={["Hello", "World"]} showContent={true} />
      <canvas ref={canvasRef} />
    </>
  );
};

export default RPGGameBoard;
