import { COLLISIONS } from "./collisions";
import islandImgSrc from "../../images/RPG/island_v2.png";
import islandForegroundImgSrc from "../../images/RPG/island_foreground_v2.png";
import museumBackgroundImgSrc from "../../images/RPG/museum_v3.png";
import museumForegroundImgSrc from "../../images/RPG/museum_foreground_v2.png";
import animatedRiverSrc from "../../images/RPG/animated_river_waterfall.png";
import yellowHatNPCDown from '../../images/RPG/characters/yellow-hat/down.png'
import yellowHatNPCUp from '../../images/RPG/characters/yellow-hat/up.png'
import yellowHatNPCLeft from '../../images/RPG/characters/yellow-hat/left.png'
import yellowHatNPCRight from '../../images/RPG/characters/yellow-hat/right.png'

import { WORK_HISTORY } from "./workHistory";
import { WelcomeSign } from "../../components/Prompts/Museum";
import { Keys, GameMap } from "./types";

export const MAPS_CONFIG: GameMap.Maps = {
  [GameMap.MapNames.ISLAND]: {
    imageBackgroundSrc: islandImgSrc,
    imageForegroundSrc: islandForegroundImgSrc,
    offset: {
      x: -1555,
      y: -700,
    },
    dimensions: {
      width: 70,
      height: 40,
    },
    doors: [
      {
        map: GameMap.MapNames.MUSEUM,
        entryDirection: Keys.W,
        position: {
          x: 43,
          y: 9,
        },
      },
    ],
    animations: [
      {
        spriteSheetSrc: animatedRiverSrc,
        frames: {
          total: 3,
          rate: 80,
        },
        position: {
          x: 12,
          y: 9,
        },
      },
    ],
    npcs: [
      {
        position: {
          x: 43,
          y: 9,
        },
        imageSrc: yellowHatNPCDown,
        frames: { total: 6, rate: 10 },
        sprites: {
          up: yellowHatNPCUp,
          down: yellowHatNPCDown,
          left: yellowHatNPCLeft,
          right: yellowHatNPCRight,
        },
        movable: true,
      }
    ],
    zoomScale: 4,
    collisions: COLLISIONS[GameMap.MapNames.ISLAND],
  },
  [GameMap.MapNames.MUSEUM]: {
    imageBackgroundSrc: museumBackgroundImgSrc,
    imageForegroundSrc: museumForegroundImgSrc,
    offset: {
      x: -2180,
      y: -1150,
    },
    dimensions: {
      width: 100,
      height: 40,
    },
    doors: [
      {
        map: GameMap.MapNames.ISLAND,
        entryDirection: Keys.S,
        position: {
          x: 48,
          y: 29,
        },
        span: {
          width: 5,
          height: 1,
        },
      },
    ],
    zoomScale: 3.5,
    collisions: COLLISIONS[GameMap.MapNames.MUSEUM],
    prompts: [
      {
        ...WORK_HISTORY.paysail,
        position: {
          x: 59,
          y: 16,
        },
        span: {
          width: 3,
          height: 2,
        },
      },
      {
        ...WORK_HISTORY.vetted,
        position: {
          x: 65,
          y: 16,
        },
        span: {
          width: 3,
          height: 2,
        },
      },
      {
        ...WORK_HISTORY.scoop,
        position: {
          x: 71,
          y: 16,
        },
        span: {
          width: 3,
          height: 2,
        },
      },
      {
        ...WORK_HISTORY.awayco,
        position: {
          x: 77,
          y: 16,
        },
        span: {
          width: 3,
          height: 2,
        },
      },
      {
        ...WORK_HISTORY.fetch,
        position: {
          x: 82,
          y: 16,
        },
        span: {
          width: 3,
          height: 2,
        },
      },
      {
        title: "Museum of Sean Lee",
        content: [WelcomeSign],
        position: {
          x: 50,
          y: 26,
        },
      },
    ],
  },
};
