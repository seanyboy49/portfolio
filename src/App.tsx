import React, { useCallback, useRef } from "react";
import pelletTownSrc from "./images/pellet-town.png";
import playerUpSrc from "./images/player-up.png";
import playerDownSrc from "./images/player-down.png";
import playerRightSrc from "./images/player-right.png";
import playerLeftSrc from "./images/player-left.png";

import "./App.css";
import Sprite from "./classes/Sprite";
import collisions from "./data/collisions";
import Boundary from "./classes/Boundary";
import Game from "./classes/Game";
import useBetterCanvas from "./hooks/useBetterCanvas";

export const OFFSET = {
  x: -735,
  y: -650,
} as const;

// Width/Height in tiles
export const MAP_DIMENSIONS = {
  width: 70,
  height: 40,
} as const;

// Set up collision boundaries
const collisionsMap: Array<number[]> = [];
// map is 70 tiles map and 40 tiles tall
for (let i = 0; i < collisions.length; i += MAP_DIMENSIONS.width) {
  collisionsMap.push(collisions.slice(i, i + MAP_DIMENSIONS.width));
}

function App() {
  const backgroudSprite = useRef<Sprite | null>(null);
  const playerSprite = useRef<Sprite | null>(null);
  const boundarySprites = useRef<Boundary[] | null>(null);
  // const keyEvent = useKeyboardInput();

  // const draw = useCallback(
  //   (context: CanvasRenderingContext2D) => {
  //     const background = backgroudSprite.current;
  //     const player = playerSprite.current;
  //     const boundaries = boundarySprites.current;

  //     if (!background || !player || !boundaries) {
  //       return;
  //     }

  //     // Draw sprites
  //     background.draw();
  //     player.draw();
  //     boundaries.forEach((boundary) => boundary.draw());

  //     // Handle keyboard events
  //     background.handleKeyboardInput(keyEvent);
  //     player.handleKeyboardInput(keyEvent, boundaries);
  //     boundaries.forEach((boundary) => boundary.handleKeyboardInput(keyEvent));
  //   },
  //   [keyEvent]
  // );

  /**
   * Set up sprites
   */
  // const setUpSprites = useCallback(
  //   (context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
  //     backgroudSprite.current = new Sprite({
  //       ctx: context,
  //       position: { x: OFFSET.x, y: OFFSET.y },
  //       // position: { x: 0, y: 0 },
  //       imageSrc: pelletTownSrc,
  //     });

  //     playerSprite.current = new Sprite({
  //       ctx: context,
  //       position: { x: canvas.width / 2, y: canvas.height / 2 },
  //       imageSrc: playerDownSrc,
  //       frames: { total: 4, rate: 10 },
  //       sprites: {
  //         up: playerUpSrc,
  //         down: playerDownSrc,
  //         left: playerLeftSrc,
  //         right: playerRightSrc,
  //       },
  //       movable: false,
  //     });

  //     const boundaries = collisionsMap
  //       .flatMap((row, y) => {
  //         return row.map((cell, x) => {
  //           if (cell === 1025) {
  //             return new Boundary({
  //               ctx: context,
  //               position: {
  //                 x: x * Boundary.width + OFFSET.x,
  //                 y: y * Boundary.height + OFFSET.y,
  //               },
  //             });
  //           }
  //           return null;
  //         });
  //       })
  //       .filter((v): v is Boundary => v !== null);

  //     boundarySprites.current = boundaries;
  //   },
  //   []
  // );

  const setUpGame = useCallback((ctx: CanvasRenderingContext2D) => {
    console.log("setup");
    const background = new Sprite({
      ctx: ctx,
      position: { x: OFFSET.x, y: OFFSET.y },
      imageSrc: pelletTownSrc,
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

    const game = new Game({
      ctx,
      background,
      player,
      collisions: collisionsMap,
    });

    return game;
  }, []);

  const canvas = useBetterCanvas(setUpGame);

  return (
    <div className="App">
      <canvas ref={canvas} />
    </div>
  );
}

export default App;
