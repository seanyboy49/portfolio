import islandImgSrc from "../../images/RPG/island_v1.png";
import { COLLISIONS } from "./collisions";

import museumBackgroundImgSrc from "../../images/RPG/museum_v3.png";
import museumForegroundImgSrc from "../../images/RPG/museum_foreground_v2.png";
import { Keys } from "./types";
import { WORK_HISTORY } from "./workHistory";
import { WelcomeSign } from "../../components/Prompts/Museum";
import { GameMap } from "./types";

export const MAPS_CONFIG: GameMap.Maps = {
  [GameMap.MapNames.ISLAND]: {
    imageBackgroundSrc: islandImgSrc,
    // imageForegroundSrc: islandImgSrc,
    offset: {
      // x: -1555,
      x: -700,
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
      //   {
      //     map: Maps.HOME,
      //     position: {
      //       x: 749,
      //       y: 324,
      //     },
      //   },
    ],
    prompts: [],
    zoomScale: 4,
    collisions: COLLISIONS[GameMap.MapNames.ISLAND],
  },
  [GameMap.MapNames.MUSEUM]: {
    imageBackgroundSrc: museumBackgroundImgSrc,
    imageForegroundSrc: museumForegroundImgSrc,
    offset: {
      x: -2180,
      y: -1200,
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
  //   [Maps.HOME]: {
  //     imageBackgroundSrc: museumBackgroundImgSrc,
  //     imageForegroundSrc: museumForegroundImgSrc,
  //     offset: {
  //       x: -1555,
  //       y: -700,
  //     },
  //     dimensions: {
  //       width: 70,
  //       height: 40,
  //     },
  //     doors: [
  //       {
  //         map: Maps.MUSEUM,
  //         position: {
  //           x: 1197,
  //           y: -124,
  //         },
  //       },
  //     ],
  //     zoomScale: 3.5,
  //   },
};
