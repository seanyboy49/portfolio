import { useCallback, useEffect, useRef } from "react";
import Sprite from "../classes/Sprite";
import useCanvas from "../hooks/useCanvas";
import pelletTownSrc from "../images/pellet-town.png";
import playerSrc from "../images/player-down.png";

const OFFSET = {
  x: -735,
  y: -650,
};

const VELOCITY = 3;

interface Props {
  backgroundSprite: React.MutableRefObject<Sprite>;
  playerSprite: React.MutableRefObject<Sprite>;
}
const Game = ({ backgroundSprite, playerSprite }: Props) => {
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

  const draw = useCallback((context: CanvasRenderingContext2D) => {
    const background = backgroundSprite.current;
    const player = playerSprite.current;

    if (!background || !player) {
      return;
    }

    background.draw();
    player.draw();

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

  /**
   * Set up sprites
   */
  const setUpSprites = useCallback(
    (context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
      backgroundSprite.current = new Sprite(
        context,
        { x: OFFSET.x, y: OFFSET.y },
        pelletTownSrc
      );

      playerSprite.current = new Sprite(
        context,
        { x: canvas.width / 2, y: canvas.height / 2 },
        playerSrc
      );
    },
    []
  );

  const canvas = useCanvas(draw, setUpSprites);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const background = backgroundSprite.current;
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
      const background = backgroundSprite.current;
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

  return <canvas ref={canvas} />;
};

export default Game;
