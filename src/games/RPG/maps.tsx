import islandImgSrc from "../../images/RPG/island_v1.png";
import { COLLISIONS } from "./collisions";

import museumBackgroundImgSrc from "../../images/RPG/museum_v3.png";
import museumForegroundImgSrc from "../../images/RPG/museum_foreground_v2.png";
import { Keys } from "./types";
import { WORK_HISTORY } from "./workHistory";
import { WelcomeSign } from "../../components/Prompts/Museum";

export enum Maps {
  ISLAND = "island",
  MUSEUM = "museum",
  //   HOME = "home",
}

export type MapConfig = {
  imageBackgroundSrc: string;
  imageForegroundSrc?: string;
  offset: {
    x: number;
    y: number;
  };
  lastPosition?: {
    x: number;
    y: number;
  };
  dimensions: {
    width: number;
    height: number;
  };
  doors: DoorConfig[];
  prompts: PromptConfig[];
  zoomScale: number;
  collisions: number[];
};

export type MapsConfig = {
  [key in Maps]: MapConfig;
};

export type DoorConfig = {
  map: Maps;
  /**
   * Matrix Coordinates in collisionMap
   */
  position: {
    x: number;
    y: number;
  };
  entryDirection: Keys;
  span?: {
    width: number;
    height: number;
  };
};
export type Content = string | React.FunctionComponent;
export type Dialogue = {
  title: string;
  content: Content[];
};
export type PromptConfig = {
  title: string;
  content: Content[];
  /**
   * Matrix Coordinates in collisionMap
   */
  position: {
    x: number;
    y: number;
  };
  span?: {
    width: number;
    height: number;
  };
};

export const MAPS_CONFIG: MapsConfig = {
  [Maps.ISLAND]: {
    imageBackgroundSrc: islandImgSrc,
    // imageForegroundSrc: islandImgSrc,
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
        map: Maps.MUSEUM,
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
    collisions: COLLISIONS[Maps.ISLAND],
  },
  [Maps.MUSEUM]: {
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
        map: Maps.ISLAND,
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
    collisions: COLLISIONS[Maps.MUSEUM],
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
