import yellowHatNPCDownSrc from "../../images/RPG/characters/yellow-hat/down.png";
import yellowHatNPCUpSrc from "../../images/RPG/characters/yellow-hat/up.png";
import yellowHatNPCLeftSrc from "../../images/RPG/characters/yellow-hat/left.png";
import yellowHatNPCRightSrc from "../../images/RPG/characters/yellow-hat/right.png";
import thinkingBubbleSrc from "../../images/RPG/thinking.png";

const arcadeOwner = {
  position: {
    x: 47.2,
    y: 20,
  },
  imageSrc: yellowHatNPCDownSrc,
  frames: { total: 6, rate: 10 },
  sprites: {
    up: yellowHatNPCUpSrc,
    down: yellowHatNPCDownSrc,
    left: yellowHatNPCLeftSrc,
    right: yellowHatNPCRightSrc,
  },
  movable: true,
  promptAnimation: thinkingBubbleSrc,
  dialogue: {
    title: "Arcade Owner",
    content: [
      "Unfortunately the arcade is under renovation. Check back later at another time.",
    ],
  },
};

const neighbor = {
  position: {
    x: 39.2,
    y: 20,
  },
  imageSrc: yellowHatNPCDownSrc,
  frames: { total: 6, rate: 10 },
  sprites: {
    up: yellowHatNPCUpSrc,
    down: yellowHatNPCDownSrc,
    left: yellowHatNPCLeftSrc,
    right: yellowHatNPCRightSrc,
  },
  movable: true,
  promptAnimation: thinkingBubbleSrc,
  dialogue: {
    title: "Arcade Owner",
    content: [
      "Unfortunately the arcade is under renovation. Check back later at another time.",
    ],
  },
};

export const NPCS = {
  arcadeOwner,
  neighbor,
};
