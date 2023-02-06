import { useCallback, useState } from "react";
import islandV1Src from "../images/island_v1.png";
import playerUpSrc from "../images/player-up.png";
import playerDownSrc from "../images/player-down.png";
import playerRightSrc from "../images/player-right.png";
import playerLeftSrc from "../images/player-left.png";

import Sprite from "../games/RPG/Sprite";
import RPGGame from "../games/RPG/RPGGame";
import collisions from "../games/RPG/collisions";
import useCanvas from "../hooks/useCanvas";
import { MAP_DIMENSIONS, OFFSET } from "../games/RPG/types";
import PortfolioMenuUI from "./PortfolioMenuUI";

// Set up collision boundaries
const collisionsMap: Array<number[]> = [];
// map is 70 tiles map and 40 tiles tall
for (let i = 0; i < collisions.length; i += MAP_DIMENSIONS.width) {
  collisionsMap.push(collisions.slice(i, i + MAP_DIMENSIONS.width));
}

const RPGGameBoard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const setUpGame = useCallback((ctx: CanvasRenderingContext2D) => {
    const background = new Sprite({
      ctx: ctx,
      position: { x: OFFSET.x, y: OFFSET.y },
      imageSrc: islandV1Src,
    });

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
      background,
      player,
      collisions: collisionsMap,
    });

    return game;
  }, []);

  const { canvasRef } = useCanvas({
    setUpGame,
    initialState: {
      isPlaying: true,
    },
  });

  const toggleMenuOpen = useCallback(() => {
    setIsMenuOpen((isMenuOpen) => !isMenuOpen);
  }, []);

  return (
    <>
      <PortfolioMenuUI isOpen={isMenuOpen} toggleMenuOpen={toggleMenuOpen} />
      <canvas ref={canvasRef} />
    </>
  );
};

export default RPGGameBoard;
