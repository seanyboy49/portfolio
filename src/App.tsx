import React, { useCallback, useEffect, useRef } from "react";
import pelletTownSrc from "./images/pellet-town.png";
import playerSrc from "./images/player-down.png";

import "./App.css";
import Sprite from "./classes/Sprite";

const OFFSET = {
  x: -735,
  y: -650,
};

const VELOCITY = 3;

function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasCtxRef = useRef<CanvasRenderingContext2D | null>(null);
  const requestIdRef = useRef<number | null>(null);

  const backgroudSprite = useRef<Sprite | null>(null);
  const playerSprite = useRef<Sprite | null>(null);
  const keys = useRef({
    w: {
      pressed: false,
    },
    a: {
      pressed: false,
    },
    s: {
      pressed: false,
    },
    d: {
      pressed: false,
    },
  });

  const tick = useCallback(() => {
    if (
      !canvasRef.current ||
      !canvasCtxRef.current ||
      !backgroudSprite.current ||
      !playerSprite.current
    ) {
      return;
    }
    requestIdRef.current = requestAnimationFrame(tick);

    const background = backgroudSprite.current;

    background.draw();
    playerSprite.current.draw();

    // Move sprites
    if (keys.current.w.pressed) {
      background.position.y += VELOCITY;
    } else if (keys.current.s.pressed) {
      background.position.y -= VELOCITY;
    } else if (keys.current.a.pressed) {
      background.position.x += VELOCITY;
    } else if (keys.current.d.pressed) {
      background.position.x -= VELOCITY;
    }
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;

      // Set up width and height
      canvas.width = 1024;
      canvas.height = 576;

      canvasCtxRef.current = canvas.getContext("2d");

      if (canvas && canvasCtxRef.current) {
        const ctx = canvasCtxRef.current;

        // Set up sprites
        backgroudSprite.current = new Sprite(
          ctx,
          { x: OFFSET.x, y: OFFSET.y },
          pelletTownSrc
        );

        playerSprite.current = new Sprite(
          ctx,
          { x: canvas.width / 2, y: canvas.height / 2 },
          // { x: 0, y: 0 },
          playerSrc
        );

        requestIdRef.current = requestAnimationFrame(tick);

        return () => {
          if (requestIdRef.current) {
            cancelAnimationFrame(requestIdRef.current);
          }
        };
      }
    }
  }, [tick]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const background = backgroudSprite.current;
      if (!background) return;
      switch (event.key) {
        case "w":
          keys.current.w.pressed = true;
          break;
        case "s":
          keys.current.s.pressed = true;
          break;
        case "a":
          keys.current.a.pressed = true;
          break;
        case "d":
          keys.current.d.pressed = true;
          break;
      }
    }
    function handleKeyUp(event: KeyboardEvent) {
      const background = backgroudSprite.current;
      if (!background) return;
      switch (event.key) {
        case "w":
          keys.current.w.pressed = false;
          break;
        case "s":
          keys.current.s.pressed = false;
          break;
        case "a":
          keys.current.a.pressed = false;
          break;
        case "d":
          keys.current.d.pressed = false;
          break;
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  });

  return (
    <div className="App">
      <canvas ref={canvasRef} />
    </div>
  );
}

export default App;
