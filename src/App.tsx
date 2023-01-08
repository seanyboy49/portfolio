import React, { useCallback, useEffect, useRef } from "react";
import pelletTownSrc from "./images/pellet-town.png";
import playerSrc from "./images/player-down.png";

import "./App.css";
import Sprite from "./classes/Sprite";
import useCanvas from "./hooks/useCanvas";

const OFFSET = {
  x: -735,
  y: -650,
};

enum Keys {
  W = "w",
  A = "a",
  S = "s",
  D = "d",
}

function App() {
  const backgroudSprite = useRef<Sprite | null>(null);
  const playerSprite = useRef<Sprite | null>(null);
  const keys = useRef({
    [Keys.W]: {
      pressed: false,
    },
    [Keys.A]: {
      pressed: false,
    },
    [Keys.S]: {
      pressed: false,
    },
    [Keys.D]: {
      pressed: false,
    },
  });

  const draw = useCallback((context: CanvasRenderingContext2D) => {
    const background = backgroudSprite.current;
    const player = playerSprite.current;

    if (!background || !player) {
      return;
    }

    background.draw();
    player.draw();

    // Move sprites
    const key = keys.current;

    if (key[Keys.W].pressed) {
      background.position.y += Sprite.Velocity;
    } else if (key[Keys.S].pressed) {
      background.position.y -= Sprite.Velocity;
    } else if (key[Keys.A].pressed) {
      background.position.x += Sprite.Velocity;
    } else if (key[Keys.D].pressed) {
      background.position.x -= Sprite.Velocity;
    }
  }, []);

  /**
   * Set up sprites
   */
  const setUpSprites = useCallback(
    (context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
      backgroudSprite.current = new Sprite(
        context,
        { x: OFFSET.x, y: OFFSET.y },
        pelletTownSrc
      );

      playerSprite.current = new Sprite(
        context,
        { x: canvas.width / 2, y: canvas.height / 2 },
        playerSrc,
        { total: 4, rate: 10 }
      );
    },
    []
  );

  const canvas = useCanvas(draw, setUpSprites);

  // Register event listeners
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const background = backgroudSprite.current;
      if (!background) return;

      switch (event.key) {
        case Keys.W:
          keys.current.w.pressed = true;
          break;
        case Keys.S:
          keys.current.s.pressed = true;
          break;
        case Keys.A:
          keys.current.a.pressed = true;
          break;
        case Keys.D:
          keys.current.d.pressed = true;
          break;
      }
    }
    function handleKeyUp(event: KeyboardEvent) {
      const background = backgroudSprite.current;
      if (!background) return;
      switch (event.key) {
        case Keys.W:
          keys.current.w.pressed = false;
          break;
        case Keys.S:
          keys.current.s.pressed = false;
          break;
        case Keys.A:
          keys.current.a.pressed = false;
          break;
        case Keys.D:
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
      <canvas ref={canvas} />
    </div>
  );
}

export default App;
