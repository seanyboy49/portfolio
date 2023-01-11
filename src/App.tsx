import React, { useCallback, useEffect, useRef } from "react";
import pelletTownSrc from "./images/pellet-town.png";
import playerUpSrc from "./images/player-up.png";
import playerDownSrc from "./images/player-down.png";
import playerRightSrc from "./images/player-right.png";
import playerLeftSrc from "./images/player-left.png";

import "./App.css";
import Sprite from "./classes/Sprite";
import useCanvas from "./hooks/useCanvas";
import useKeyboardInput from "./hooks/useKeyboardInput";

const OFFSET = {
  x: -735,
  y: -650,
};

function App() {
  const backgroudSprite = useRef<Sprite | null>(null);
  const playerSprite = useRef<Sprite | null>(null);
  const keyEvent = useKeyboardInput();

  const draw = useCallback(
    (context: CanvasRenderingContext2D) => {
      const background = backgroudSprite.current;
      const player = playerSprite.current;

      if (!background || !player) {
        return;
      }

      // Draw sprites
      background.draw();
      player.draw();

      // Handle keyboard events
      background.handleKeyboardInput(keyEvent);
      player.handleKeyboardInput(keyEvent);
    },
    [keyEvent]
  );

  /**
   * Set up sprites
   */
  const setUpSprites = useCallback(
    (context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
      backgroudSprite.current = new Sprite({
        ctx: context,
        position: { x: OFFSET.x, y: OFFSET.y },
        imageSrc: pelletTownSrc,
      });

      playerSprite.current = new Sprite({
        ctx: context,
        position: { x: canvas.width / 2, y: canvas.height / 2 },
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
    },
    []
  );

  const canvas = useCanvas(draw, setUpSprites);

  return (
    <div className="App">
      <canvas ref={canvas} />
    </div>
  );
}

export default App;
