import { Dispatch, SetStateAction, useCallback, useState } from "react";

import playerUpSrc from "../images/RPG/characters/blue-hat/up.png";
import playerDownSrc from "../images/RPG/characters/blue-hat/down.png";
import playerRightSrc from "../images/RPG/characters/blue-hat/right.png";
import playerLeftSrc from "../images/RPG/characters/blue-hat/left.png";

import Sprite from "../games/RPG/Sprite";
import RPGGame from "../games/RPG/RPGGame";
import useCanvas from "../hooks/useCanvas";
import PortfolioMenuUI from "./PortfolioMenuUI";
import { MAPS_CONFIG } from "../games/RPG/config";
import { GameMap } from "../games/RPG/types";
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
        frames: { total: 6, rate: 10 },
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
        map: GameMap.MapNames.ISLAND,
        mapsConfig: MAPS_CONFIG,
        updateGameState: setGameState,
      });

      return game;
    },
    []
  );

  const { canvasRef, gameState, updateGameState } = useCanvas({
    setUpGame,
    initialState: {
      isPlaying: true,
    },
  });

  const toggleMenuOpen = useCallback(() => {
    setIsMenuOpen((isMenuOpen) => !isMenuOpen);
  }, []);

  const closeDialogue = useCallback(() => {
    updateGameState({ showDialogue: false });
  }, [updateGameState]);

  return (
    <>
      <PortfolioMenuUI isOpen={isMenuOpen} toggleMenuOpen={toggleMenuOpen} />
      <RPGDialogueUI
        dialogue={gameState.dialogue}
        showDialogue={gameState.showDialogue}
        handleClose={closeDialogue}
      />
      <canvas ref={canvasRef} />
    </>
  );
};

export default RPGGameBoard;
