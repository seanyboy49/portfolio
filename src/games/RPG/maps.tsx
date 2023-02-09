import museumBackgroundImgSrc from "../../images/museum_v2.png";
import museumForegroundImgSrc from "../../images/museum_foreground_v2.png";
import islandImgSrc from "../../images/island_v1.png";

export enum Maps {
  ISLAND = "island",
  MUSEUM = "museum",
  HOME = "home",
}
export type MapsConfig = {
  [key in Maps]: {
    imageBackgroundSrc: string;
    imageForegroundSrc: string;
    offset: {
      x: number;
      y: number;
    };
    dimensions: {
      width: number;
      height: number;
    };
    doors: DoorConfig[];
    zoomScale: number;
  };
};

export type DoorConfig = {
  map: Maps;
  position: {
    x: number;
    y: number;
  };
};
export const MAPS_CONFIG: MapsConfig = {
  [Maps.ISLAND]: {
    imageBackgroundSrc: islandImgSrc,
    imageForegroundSrc: islandImgSrc,
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
        position: {
          x: 1197,
          y: -124,
        },
      },
      {
        map: Maps.HOME,
        position: {
          x: 749,
          y: 324,
        },
      },
    ],
    zoomScale: 4,
  },
  [Maps.MUSEUM]: {
    imageBackgroundSrc: museumBackgroundImgSrc,
    imageForegroundSrc: museumForegroundImgSrc,
    offset: {
      x: -2025,
      y: -1200,
    },
    dimensions: {
      width: 70,
      height: 40,
    },
    doors: [
      {
        map: Maps.MUSEUM,
        position: {
          x: 1197,
          y: -124,
        },
      },
    ],
    zoomScale: 3.5,
  },
  [Maps.HOME]: {
    imageBackgroundSrc: museumBackgroundImgSrc,
    imageForegroundSrc: museumForegroundImgSrc,
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
        position: {
          x: 1197,
          y: -124,
        },
      },
    ],
    zoomScale: 3.5,
  },
};
