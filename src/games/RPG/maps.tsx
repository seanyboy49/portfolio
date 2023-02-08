import museumImgSrc from "../../images/museum_v1.png";
import islandImgSrc from "../../images/island_v1.png";

export enum Maps {
  ISLAND = "island",
  MUSEUM = "museum",
  HOME = "home",
}
export type MapsConfig = {
  [key in Maps]: {
    imageSrc: string;
    offset: {
      x: number;
      y: number;
    };
    dimensions: {
      width: number;
      height: number;
    };
    doors: DoorConfig[];
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
    imageSrc: islandImgSrc,
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
  },
  [Maps.MUSEUM]: {
    imageSrc: museumImgSrc,
    offset: {
      x: -500,
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
  },
  [Maps.HOME]: {
    imageSrc: museumImgSrc,
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
  },
};
