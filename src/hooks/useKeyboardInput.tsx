import { useEffect, useRef } from "react";

export enum Keys {
  W = "w",
  A = "a",
  S = "s",
  D = "d",
}

export type KeysPressed = {
  [Keys.W]: {
    pressed: boolean;
  };
  [Keys.A]: {
    pressed: boolean;
  };
  [Keys.S]: {
    pressed: boolean;
  };
  [Keys.D]: {
    pressed: boolean;
  };
};

const useKeyboardInput = () => {
  const keyEvents = useRef<KeysPressed>({
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

  // Register event listeners
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      switch (event.key) {
        case Keys.W:
          keyEvents.current.w.pressed = true;
          break;
        case Keys.S:
          keyEvents.current.s.pressed = true;
          break;
        case Keys.A:
          keyEvents.current.a.pressed = true;
          break;
        case Keys.D:
          keyEvents.current.d.pressed = true;
          break;
      }
    }
    function handleKeyUp(event: KeyboardEvent) {
      switch (event.key) {
        case Keys.W:
          keyEvents.current.w.pressed = false;
          break;
        case Keys.S:
          keyEvents.current.s.pressed = false;
          break;
        case Keys.A:
          keyEvents.current.a.pressed = false;
          break;
        case Keys.D:
          keyEvents.current.d.pressed = false;
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

  return keyEvents.current;
};

export default useKeyboardInput;
